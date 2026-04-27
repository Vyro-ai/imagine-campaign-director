#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BUILTIN_TEMPLATES = {
  image: {
    namePrefix: "Image",
    url: { endpoint: "/image/generations/upload", version: "v1" },
    behavior: "dynamic",
    metadataDefaults: { addedFrom: "paste", enabledOverrideAspectRatio: false },
    defaultMeasured: { width: 577, height: 484 },
    inputSchemas: [
      {
        key: "prompt",
        type: "text",
        order: 0,
        label: "Prompt",
        required: true,
        description: "The text prompt to generate an image from",
      },
      {
        key: "imageUrl",
        type: "image",
        order: 1,
        label: "Reference Image",
        required: false,
        description: "URLs of the images to use for image-to-image generation or image editing",
        limit: 10,
        visible: true,
      },
    ],
    outputSchemas: [
      {
        key: "image",
        type: "image",
        order: 0,
        label: "Image",
        required: false,
        visible: true,
      },
    ],
  },
  video: {
    namePrefix: "Video",
    url: { endpoint: "/video/upload", version: "v1" },
    behavior: "dynamic",
    metadataDefaults: { addedFrom: "paste" },
    exposedParameterKeys: [],
    inputSchemas: [
      {
        key: "prompt",
        type: "text",
        order: 0,
        label: "Prompt",
        required: true,
        description:
          "Text prompt describing the video you want to generate. Use @Image1, @Video1, @Audio1 to reference inputs in reference mode.",
      },
      {
        key: "imageUrl",
        type: "image",
        order: 1,
        label: "Start Frame",
        required: false,
        limit: 1,
        visible: false,
        description: "Starting frame image to animate. Supported formats: JPEG, PNG, WebP. Max 30 MB.",
        optionsIf: [
          { when: { has: "referenceUrl" }, set: { visible: false } },
          { when: { has: "videoUrl" }, set: { visible: false } },
          { when: { has: "audioUrl" }, set: { visible: false } },
        ],
      },
      {
        key: "lastFrame",
        type: "image",
        order: 2,
        label: "End Frame",
        required: false,
        limit: 1,
        visible: false,
        description: "Optional end frame image. The video will transition from start to end frame.",
        optionsIf: [
          { when: { has: "referenceUrl" }, set: { visible: false } },
          { when: { has: "videoUrl" }, set: { visible: false } },
          { when: { has: "audioUrl" }, set: { visible: false } },
        ],
      },
      {
        key: "referenceUrl",
        type: "image",
        order: 3,
        label: "Reference Images",
        required: false,
        limit: 9,
        visible: true,
        description:
          "Reference images to guide generation. Refer to them as @Image1, @Image2, etc. Up to 9 images, max 30 MB each.",
        optionsIf: [
          { when: { has: "imageUrl" }, set: { visible: false } },
          { when: { has: "lastFrame" }, set: { visible: false } },
        ],
      },
      {
        key: "videoUrl",
        type: "video",
        order: 4,
        label: "Reference Videos",
        required: false,
        limit: 3,
        visible: true,
        description:
          "Reference videos to guide generation. Refer to them as @Video1, @Video2, etc. Up to 3 videos, combined 2-15s, max 50 MB total.",
        optionsIf: [
          { when: { has: "imageUrl" }, set: { visible: false } },
          { when: { has: "lastFrame" }, set: { visible: false } },
        ],
      },
      {
        key: "audioUrl",
        type: "audio",
        order: 5,
        label: "Reference Audio",
        required: false,
        limit: 3,
        visible: true,
        description:
          "Reference audio to guide generation. Refer to them as @Audio1, @Audio2, etc. Up to 3 files, combined max 15s. Requires at least one reference image or video.",
        optionsIf: [
          { when: { has: "imageUrl" }, set: { visible: false } },
          { when: { has: "lastFrame" }, set: { visible: false } },
        ],
      },
    ],
    outputSchemas: [
      {
        key: "video",
        type: "video",
        order: 0,
        label: "Video",
        required: false,
        visible: true,
      },
    ],
  },
  import: {
    namePrefix: "Import",
    url: { endpoint: "/assets/upload", version: "v1" },
    behavior: "static",
    metadataDefaults: { addedFrom: "paste" },
    inputSchemas: [],
    outputSchemas: [
      {
        key: "file",
        type: "video",
        order: 0,
        label: "File",
        required: false,
        visible: true,
      },
    ],
    defaultSettings: {
      maxFileSize: 31457280,
      allowedFileTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
    },
  },
};

const REFERENCE_SUPPORT_KEYS = new Set(["imageUrl", "referenceUrl", "videoUrl", "audioUrl", "lastFrame"]);
const START_FRAME_VIDEO_MODES = new Set(["start-frame", "start_frame", "drop-in", "drop_in", "image-to-video", "image_to_video"]);
const REFERENCE_LANGUAGE_RULES = [
  {
    pattern: /@\s*(?:image|video|audio)\d+/i,
    reason: "explicit @Image/@Video/@Audio reference token",
  },
  {
    pattern:
      /\b(?:same|exact)\s+(?:woman|man|person|subject|character|face|identity|hair|freckle|styling|pose|posture|outfit|garment|look|tile|grid|still|frame)\b/i,
    reason: "continuity language",
  },
  {
    pattern: /\b(?:connected|supplied)\s+(?:reference|image|grid|tile|portrait|still|frame|hero still|hero image)\b/i,
    reason: "connected/supplied source language",
  },
  {
    pattern: /\bvariant\s+[a-z0-9-]+\b/i,
    reason: "named upstream variant reference",
  },
  {
    pattern: /\bother\s+stage\s+\d+\b/i,
    reason: "upstream stage reference",
  },
];
const PLURAL_REFERENCE_PATTERN =
  /\b(?:approved\s+visual\s+references|visual\s+references|reference\s+set|reference\s+images|multiple\s+references|all\s+references)\b/i;
const STORYBOARD_REFERENCE_PATTERN = /\b(?:director['’]s-notes|storyboard|motion\s+board|camera-movement\s+board)\b/i;
const TIME_RANGE_PATTERN = /\b(\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(\d+(?:\.\d+)?)\s*s\b/gi;
const IMAGE_TOKEN_PATTERN = /@\s*Image\s*(\d+)/gi;

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    copy: false,
    mode: null,
    indent: 2,
    preserveIds: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (token === "--input" || token === "-i") {
      args.input = argv[index + 1];
      index += 1;
    } else if (token === "--out" || token === "-o") {
      args.out = argv[index + 1];
      index += 1;
    } else if (token === "--copy") {
      args.copy = true;
    } else if (token === "--mode") {
      args.mode = argv[index + 1];
      index += 1;
    } else if (token === "--indent") {
      args.indent = Number(argv[index + 1]);
      index += 1;
    } else if (token === "--preserve-ids") {
      args.preserveIds = true;
    } else if (token === "--help" || token === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }

  return args;
}

function printHelp() {
  const scriptPath = path.relative(process.cwd(), fileURLToPath(import.meta.url));
  console.log(`Usage: node ${scriptPath} [--input file.json] [--out payload.json] [--copy] [--mode canonical|raw]

Reads a workflow spec from a file or stdin and emits paste-ready Imagine.Art workflow JSON.

Modes:
  canonical  Materialize a simpler local spec into Imagine.Art-style node/edge payloads.
  raw        Pass through an already-materialized { nodes, edges } payload.

Options:
  --input, -i       Read JSON from file instead of stdin
  --out, -o         Write the payload to a file
  --copy            Copy the payload to the macOS clipboard with pbcopy
  --mode            Force mode instead of auto-detecting
  --indent          JSON indent width (default: 2)
  --preserve-ids    Keep provided node ids instead of generating UUIDs
`);
}

function readInput(inputPath) {
  if (inputPath) {
    return fs.readFileSync(inputPath, "utf8");
  }

  return fs.readFileSync(0, "utf8");
}

function detectMode(source) {
  if (Array.isArray(source.nodes) && source.nodes.every((node) => node && typeof node === "object" && "data" in node)) {
    return "raw";
  }

  if (Array.isArray(source.nodes)) {
    return "canonical";
  }

  throw new Error("Expected JSON with top-level nodes and edges arrays.");
}

function inferImportOutputType(nodeSpec) {
  if (nodeSpec.outputType) {
    return nodeSpec.outputType;
  }

  const fileType = nodeSpec.settings?.fileType;
  if (typeof fileType === "string") {
    if (fileType.startsWith("image/")) {
      return "image";
    }

    if (fileType.startsWith("audio/")) {
      return "audio";
    }

    if (fileType.startsWith("video/")) {
      return "video";
    }
  }

  return "video";
}

function cloneJson(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function findSchemaByKey(schemas, key) {
  return Array.isArray(schemas) ? schemas.find((schema) => schema?.key === key) ?? null : null;
}

function appendUniqueOptionIf(schema, whenHas, set) {
  if (!schema) {
    return;
  }

  if (!Array.isArray(schema.optionsIf)) {
    schema.optionsIf = [];
  }

  const normalizedSet = JSON.stringify(set);
  const exists = schema.optionsIf.some(
    (entry) => entry?.when?.has === whenHas && JSON.stringify(entry?.set ?? null) === normalizedSet
  );

  if (!exists) {
    schema.optionsIf.push({ when: { has: whenHas }, set });
  }
}

function normalizeVideoInputMode(nodeSpec) {
  const rawMode = nodeSpec?.inputMode ?? nodeSpec?.videoInputMode ?? nodeSpec?.metadata?.videoInputMode ?? null;
  if (rawMode == null) {
    return null;
  }

  return String(rawMode).trim().toLowerCase();
}

function applyVideoInputMode(template, nodeSpec) {
  const normalizedMode = normalizeVideoInputMode(nodeSpec);
  if (!START_FRAME_VIDEO_MODES.has(normalizedMode)) {
    return template;
  }

  const imageUrlSchema = findSchemaByKey(template.inputSchemas, "imageUrl");
  const lastFrameSchema = findSchemaByKey(template.inputSchemas, "lastFrame");
  const referenceUrlSchema = findSchemaByKey(template.inputSchemas, "referenceUrl");
  const videoUrlSchema = findSchemaByKey(template.inputSchemas, "videoUrl");
  const audioUrlSchema = findSchemaByKey(template.inputSchemas, "audioUrl");

  if (imageUrlSchema) {
    imageUrlSchema.visible = true;
    appendUniqueOptionIf(imageUrlSchema, "lastFrame", { required: true });
  }

  if (lastFrameSchema) {
    lastFrameSchema.visible = true;
  }

  if (referenceUrlSchema) {
    referenceUrlSchema.visible = false;
    appendUniqueOptionIf(referenceUrlSchema, "audioUrl", { minRequired: 1, required: true });
    appendUniqueOptionIf(referenceUrlSchema, "videoUrl", { minRequired: 1, required: true });
  }

  if (videoUrlSchema) {
    videoUrlSchema.visible = false;
  }

  if (audioUrlSchema) {
    audioUrlSchema.visible = false;
  }

  template.metadataDefaults = {
    ...(template.metadataDefaults ?? {}),
    addedFrom: "drop in",
  };

  template.defaultMeasured = { width: 572, height: 408 };
  return template;
}

function defaultCountForSchema(schema) {
  return schema.key === "prompt" ? 1 : 1;
}

function expandedLabel(schema, count, slotIndex) {
  if (count > 1) {
    return `${schema.label} ${slotIndex + 1}`;
  }

  return schema.label;
}

function makeHandleId(nodeId, direction, schema, slotIndex) {
  if (slotIndex === 0) {
    return `${nodeId}|${direction}:${schema.type}:${schema.key}`;
  }

  return `${randomUUID()}|${direction}:${schema.type}:${schema.key}`;
}

function materializeHandles(nodeId, template, nodeSpec) {
  const inputSchemas = cloneJson(template.inputSchemas ?? []);
  const outputSchemas = cloneJson(template.outputSchemas ?? []);
  const slotCounts = nodeSpec.slotCounts ?? {};
  const handles = { inputs: [], outputs: [] };
  const handleLookup = { input: new Map(), output: new Map() };

  for (const schema of inputSchemas) {
    const count = Number(slotCounts[schema.key] ?? defaultCountForSchema(schema));
    const ids = [];

    for (let slotIndex = 0; slotIndex < count; slotIndex += 1) {
      const id = makeHandleId(nodeId, "input", schema, slotIndex);
      ids.push(id);
      handles.inputs.push({
        ...schema,
        id,
        label: expandedLabel(schema, count, slotIndex),
      });
    }

    handleLookup.input.set(schema.key, ids);
  }

  for (const schema of outputSchemas) {
    const count = Number(slotCounts[schema.key] ?? 1);
    const ids = [];

    for (let slotIndex = 0; slotIndex < count; slotIndex += 1) {
      const id = makeHandleId(nodeId, "output", schema, slotIndex);
      ids.push(id);
      handles.outputs.push({
        ...schema,
        id,
        label: expandedLabel(schema, count, slotIndex),
      });
    }

    handleLookup.output.set(schema.key, ids);
  }

  return {
    handles,
    inputHandleSchemas: inputSchemas.map((schema) => ({ ...schema })),
    outputSchemas,
    handleLookup,
  };
}

function inferExternalHandleId(nodeId, direction, schema, slotIndex) {
  if (slotIndex !== 0) {
    return null;
  }

  return `${nodeId}|${direction}:${schema.type}:${schema.key}`;
}

function normalizeExplicitHandleLookup(explicitHandles, direction) {
  const lookup = new Map();

  if (!explicitHandles || typeof explicitHandles !== "object") {
    return lookup;
  }

  for (const [key, rawValue] of Object.entries(explicitHandles)) {
    const values = Array.isArray(rawValue) ? rawValue : rawValue == null ? [] : [rawValue];
    const normalizedValues = values.map((value) => String(value));
    lookup.set(key, normalizedValues);
  }

  return lookup;
}

function materializeExternalNodeRecord(source, nodeSpec, index) {
  if (!nodeSpec || typeof nodeSpec !== "object") {
    throw new Error(`External node at index ${index} must be an object.`);
  }

  if (!nodeSpec.id) {
    throw new Error(`External node at index ${index} is missing required field: id`);
  }

  const logicalId = nodeSpec.id;
  const materializedId = nodeSpec.nodeId ?? nodeSpec.materializedId ?? logicalId;
  const explicitInputs = normalizeExplicitHandleLookup(nodeSpec.handles?.input, "input");
  const explicitOutputs = normalizeExplicitHandleLookup(nodeSpec.handles?.output, "output");
  const handleLookup = {
    input: new Map(explicitInputs),
    output: new Map(explicitOutputs),
  };

  if (!nodeSpec.type) {
    if (handleLookup.input.size === 0 && handleLookup.output.size === 0) {
      throw new Error(
        `External node "${logicalId}" must provide either a node type for handle inference or explicit handles.input/handles.output ids.`
      );
    }

    return {
      logicalId,
      materializedId,
      handleLookup,
    };
  }

  const template = resolveTemplate(source, nodeSpec);
  const slotCounts = nodeSpec.slotCounts ?? {};
  const inputSchemas = cloneJson(template.inputSchemas ?? []);
  const outputSchemas = cloneJson(template.outputSchemas ?? []);

  for (const schema of inputSchemas) {
    const count = Number(slotCounts[schema.key] ?? defaultCountForSchema(schema));
    const explicitIds = handleLookup.input.get(schema.key) ?? [];
    const inferredIds = [];

    for (let slotIndex = 0; slotIndex < count; slotIndex += 1) {
      if (explicitIds[slotIndex]) {
        inferredIds.push(explicitIds[slotIndex]);
        continue;
      }

      const inferredId = inferExternalHandleId(materializedId, "input", schema, slotIndex);
      if (!inferredId) {
        throw new Error(
          `External node "${logicalId}" needs an explicit input handle id for ${schema.key}[${slotIndex}] because only slot 0 can be inferred deterministically.`
        );
      }

      inferredIds.push(inferredId);
    }

    handleLookup.input.set(schema.key, inferredIds);
  }

  for (const schema of outputSchemas) {
    const count = Number(slotCounts[schema.key] ?? 1);
    const explicitIds = handleLookup.output.get(schema.key) ?? [];
    const inferredIds = [];

    for (let slotIndex = 0; slotIndex < count; slotIndex += 1) {
      if (explicitIds[slotIndex]) {
        inferredIds.push(explicitIds[slotIndex]);
        continue;
      }

      const inferredId = inferExternalHandleId(materializedId, "output", schema, slotIndex);
      if (!inferredId) {
        throw new Error(
          `External node "${logicalId}" needs an explicit output handle id for ${schema.key}[${slotIndex}] because only slot 0 can be inferred deterministically.`
        );
      }

      inferredIds.push(inferredId);
    }

    handleLookup.output.set(schema.key, inferredIds);
  }

  return {
    logicalId,
    materializedId,
    handleLookup,
  };
}

function collectIncomingReferenceKeys(source) {
  const incomingByTarget = new Map();

  for (const edgeSpec of source.edges ?? []) {
    if (!edgeSpec || typeof edgeSpec !== "object") {
      continue;
    }

    const targetId = edgeSpec.target;
    const targetKey = edgeSpec.targetKey ?? edgeSpec.inputKey;

    if (!targetId || !targetKey) {
      continue;
    }

    if (!incomingByTarget.has(targetId)) {
      incomingByTarget.set(targetId, new Set());
    }

    incomingByTarget.get(targetId).add(targetKey);
  }

  return incomingByTarget;
}

function collectIncomingReferenceDetails(source) {
  const incomingByTarget = new Map();

  for (const edgeSpec of source.edges ?? []) {
    if (!edgeSpec || typeof edgeSpec !== "object") {
      continue;
    }

    const targetId = edgeSpec.target;
    const targetKey = edgeSpec.targetKey ?? edgeSpec.inputKey;

    if (!targetId || !targetKey) {
      continue;
    }

    if (!incomingByTarget.has(targetId)) {
      incomingByTarget.set(targetId, {
        byKey: new Map(),
        edges: [],
      });
    }

    const detail = incomingByTarget.get(targetId);
    detail.edges.push(edgeSpec);
    detail.byKey.set(targetKey, (detail.byKey.get(targetKey) ?? 0) + 1);
  }

  return incomingByTarget;
}

function parseNodeDurationSeconds(nodeSpec) {
  const rawDuration = nodeSpec?.settings?.duration ?? nodeSpec?.duration ?? null;
  if (rawDuration == null) {
    return null;
  }

  const parsed = Number.parseFloat(String(rawDuration));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function collectPromptTimeRanges(prompt) {
  const ranges = [];

  if (typeof prompt !== "string") {
    return ranges;
  }

  TIME_RANGE_PATTERN.lastIndex = 0;
  let match;
  while ((match = TIME_RANGE_PATTERN.exec(prompt)) !== null) {
    const start = Number.parseFloat(match[1]);
    const end = Number.parseFloat(match[2]);

    if (Number.isFinite(start) && Number.isFinite(end) && end > start) {
      ranges.push({ start, end, raw: match[0] });
    }
  }

  return ranges;
}

function maxImageTokenIndex(prompt) {
  if (typeof prompt !== "string") {
    return 0;
  }

  let maxIndex = 0;
  IMAGE_TOKEN_PATTERN.lastIndex = 0;
  let match;
  while ((match = IMAGE_TOKEN_PATTERN.exec(prompt)) !== null) {
    const index = Number.parseInt(match[1], 10);
    if (Number.isFinite(index)) {
      maxIndex = Math.max(maxIndex, index);
    }
  }

  return maxIndex;
}

function validateCanonicalVideoTiming(source) {
  source.nodes.forEach((nodeSpec, index) => {
    if (nodeSpec?.type !== "video") {
      return;
    }

    const logicalId = nodeSpec.id ?? `node-${index + 1}`;
    const duration = parseNodeDurationSeconds(nodeSpec);
    const prompt = nodeSpec.settings?.prompt;
    const ranges = collectPromptTimeRanges(prompt);

    if (!duration || ranges.length === 0) {
      return;
    }

    const maxEnd = Math.max(...ranges.map((range) => range.end));
    if (maxEnd > duration + 0.25) {
      throw new Error(
        `Video node "${nodeSpec.name ?? logicalId}" has duration ${duration}s but its prompt contains timing up to ${maxEnd}s. Use node-local timing within the selected duration, choose a longer Seedance duration, or split the clip.`
      );
    }
  });
}

function validateCanonicalVideoReferenceContracts(source) {
  const incomingByTarget = collectIncomingReferenceDetails(source);

  source.nodes.forEach((nodeSpec, index) => {
    if (nodeSpec?.type !== "video") {
      return;
    }

    const logicalId = nodeSpec.id ?? `node-${index + 1}`;
    const name = nodeSpec.name ?? logicalId;
    const prompt = nodeSpec.settings?.prompt ?? "";
    const incoming = incomingByTarget.get(logicalId);
    const countFor = (key) => incoming?.byKey.get(key) ?? 0;
    const startFrameCount = countFor("imageUrl");
    const endFrameCount = countFor("lastFrame");
    const referenceImageCount = countFor("referenceUrl");
    const normalizedMode = normalizeVideoInputMode(nodeSpec);
    const usesStartFrameMode = START_FRAME_VIDEO_MODES.has(normalizedMode);
    const requiredImageTokens = maxImageTokenIndex(prompt);

    if (usesStartFrameMode && referenceImageCount > 0) {
      throw new Error(
        `Video node "${name}" uses start-frame mode but also has referenceUrl edges. Imagine.Art hides reference images when Start Frame/End Frame mode is active. Use either imageUrl/lastFrame for a simple start/end clip, or referenceUrl slots for a multi-reference Seedance node.`
      );
    }

    if (requiredImageTokens > 0 && referenceImageCount < requiredImageTokens) {
      throw new Error(
        `Video node "${name}" references @Image${requiredImageTokens} but only has ${referenceImageCount} incoming referenceUrl edge(s). Add the missing referenceUrl slots/edges or remove the @Image tokens.`
      );
    }

    if (PLURAL_REFERENCE_PATTERN.test(prompt) && referenceImageCount === 0) {
      throw new Error(
        `Video node "${name}" says it uses multiple/approved visual references but has no incoming referenceUrl edges. Do not use plural reference language with only a single start-frame edge; wire the reference set to referenceUrl or rewrite the prompt as a start-frame-only clip.`
      );
    }

    if (STORYBOARD_REFERENCE_PATTERN.test(prompt) && referenceImageCount === 0) {
      throw new Error(
        `Video node "${name}" depends on a storyboard/director's-notes board but has no incoming referenceUrl edge for that board. Connect the approved board as a reference image or split the shot into a start-frame-only clip.`
      );
    }

    if (!usesStartFrameMode && referenceImageCount === 0 && (startFrameCount > 0 || endFrameCount > 0)) {
      throw new Error(
        `Video node "${name}" has start/end frame edges but does not declare inputMode: "start-frame". Add the explicit inputMode so the pasted node exposes the intended Start Frame/End Frame handles.`
      );
    }
  });
}

function validateCanonicalPromptReferences(source) {
  const incomingByTarget = collectIncomingReferenceKeys(source);

  source.nodes.forEach((nodeSpec, index) => {
    const logicalId = nodeSpec.id ?? `node-${index + 1}`;
    const prompt = nodeSpec.settings?.prompt;

    if (typeof prompt !== "string" || prompt.trim() === "") {
      return;
    }

    const matchedRule = REFERENCE_LANGUAGE_RULES.find(({ pattern }) => pattern.test(prompt));
    if (!matchedRule) {
      return;
    }

    const incomingKeys = incomingByTarget.get(logicalId) ?? new Set();
    const hasReferenceSupport = [...incomingKeys].some((key) => REFERENCE_SUPPORT_KEYS.has(key));

    if (!hasReferenceSupport) {
      throw new Error(
        `Node "${nodeSpec.name ?? logicalId}" uses ${matchedRule.reason} in its prompt but has no supporting incoming reference edge. Add a node connection to one of ${[...REFERENCE_SUPPORT_KEYS].join(", ")} or rewrite the prompt as self-contained.`
      );
    }
  });
}

function resolveTemplate(source, nodeSpec) {
  const customTemplate = source.templates?.[nodeSpec.type];
  const template = customTemplate ?? BUILTIN_TEMPLATES[nodeSpec.type];

  if (!template) {
    throw new Error(
      `Unknown node type "${nodeSpec.type}". Add a matching template under top-level templates or extend the built-in registry.`
    );
  }

  const resolved = cloneJson(template);
  applyVideoInputMode(resolved, nodeSpec);

  if (nodeSpec.type === "import" && Array.isArray(resolved.outputSchemas) && resolved.outputSchemas[0]) {
    resolved.outputSchemas[0].type = inferImportOutputType(nodeSpec);
  }

  return resolved;
}

function defaultImportFileType(outputType) {
  if (outputType === "video") {
    return "video/mp4";
  }

  if (outputType === "audio") {
    return "audio/mpeg";
  }

  return "image/png";
}

function defaultImportAllowedFileTypes(outputType) {
  if (outputType === "video") {
    return ["video/mp4"];
  }

  if (outputType === "audio") {
    return ["audio/mpeg", "audio/mp3", "audio/wav"];
  }

  return ["image/jpeg", "image/png", "image/webp"];
}

function materializeCanonicalWorkflow(source, options) {
  if (!Array.isArray(source.nodes)) {
    throw new Error("Canonical mode expects a top-level nodes array.");
  }

  validateCanonicalPromptReferences(source);
  validateCanonicalVideoTiming(source);
  validateCanonicalVideoReferenceContracts(source);

  const logicalToMaterialized = new Map();
  const nodeRecords = [];
  const externalNodeRecords = (source.externalNodes ?? []).map((nodeSpec, index) =>
    materializeExternalNodeRecord(source, nodeSpec, index)
  );

  for (const record of externalNodeRecords) {
    if (logicalToMaterialized.has(record.logicalId)) {
      throw new Error(`Duplicate logical node id: ${record.logicalId}`);
    }

    logicalToMaterialized.set(record.logicalId, record.materializedId);
  }

  source.nodes.forEach((nodeSpec, index) => {
    if (!nodeSpec || typeof nodeSpec !== "object") {
      throw new Error(`Node at index ${index} must be an object.`);
    }

    if (!nodeSpec.type) {
      throw new Error(`Node at index ${index} is missing required field: type`);
    }

    const logicalId = nodeSpec.id ?? `node-${index + 1}`;
    if (logicalToMaterialized.has(logicalId)) {
      throw new Error(`Duplicate logical node id: ${logicalId}`);
    }
    const materializedId = options.preserveIds ? logicalId : randomUUID();
    logicalToMaterialized.set(logicalId, materializedId);

    const template = resolveTemplate(source, nodeSpec);
    const { handles, inputHandleSchemas, handleLookup } = materializeHandles(materializedId, template, nodeSpec);
    const settings = { ...(template.defaultSettings ?? {}), ...(nodeSpec.settings ?? {}) };
    const importOutputType = nodeSpec.type === "import" ? inferImportOutputType(nodeSpec) : null;

    if (importOutputType) {
      settings.outputType ??= importOutputType;
      settings.fileType ??= defaultImportFileType(importOutputType);
      settings.allowedFileTypes ??= defaultImportAllowedFileTypes(importOutputType);
    }

    const name = nodeSpec.name ?? `${template.namePrefix ?? nodeSpec.type} ${index + 1}`;
    const metadata = { ...(template.metadataDefaults ?? {}), ...(nodeSpec.metadata ?? {}) };
    const data = {
      outputs: cloneJson(nodeSpec.outputValues ?? {}),
      errorMessage: nodeSpec.errorMessage ?? "",
      name,
      version: nodeSpec.version ?? 1,
      results: cloneJson(nodeSpec.results ?? []),
      selectedResultIndex: nodeSpec.selectedResultIndex ?? 0,
      settings,
      status: nodeSpec.status ?? "default",
      url: cloneJson(nodeSpec.url ?? template.url ?? null),
      behavior: nodeSpec.behavior ?? template.behavior ?? "dynamic",
      handles,
      metadata,
      inputHandleSchemas,
    };

    if (importOutputType) {
      data.outputType = importOutputType;
    }

    if (template.exposedParameterKeys || nodeSpec.exposedParameterKeys) {
      data.exposedParameterKeys = cloneJson(nodeSpec.exposedParameterKeys ?? template.exposedParameterKeys ?? []);
    }

    nodeRecords.push({
      logicalId,
      materializedId,
      handleLookup,
      node: {
        id: materializedId,
        type: nodeSpec.type,
        data,
        position: {
          x: Number(nodeSpec.position?.x ?? 0),
          y: Number(nodeSpec.position?.y ?? 0),
        },
        selected: Boolean(nodeSpec.selected ?? false),
        ...(nodeSpec.measured
          ? { measured: cloneJson(nodeSpec.measured) }
          : template.defaultMeasured
            ? { measured: cloneJson(template.defaultMeasured) }
            : {}),
        ...(nodeSpec.dragging !== undefined ? { dragging: Boolean(nodeSpec.dragging) } : {}),
      },
    });
  });

  const recordByLogicalId = new Map(
    [...externalNodeRecords, ...nodeRecords].map((record) => [record.logicalId, record])
  );
  const edges = (source.edges ?? []).map((edgeSpec, index) => {
    if (!edgeSpec || typeof edgeSpec !== "object") {
      throw new Error(`Edge at index ${index} must be an object.`);
    }

    const sourceRecord = recordByLogicalId.get(edgeSpec.source);
    const targetRecord = recordByLogicalId.get(edgeSpec.target);

    if (!sourceRecord) {
      throw new Error(`Edge at index ${index} references unknown source node: ${edgeSpec.source}`);
    }

    if (!targetRecord) {
      throw new Error(`Edge at index ${index} references unknown target node: ${edgeSpec.target}`);
    }

    const sourceKey = edgeSpec.sourceKey ?? edgeSpec.outputKey;
    const targetKey = edgeSpec.targetKey ?? edgeSpec.inputKey;
    const sourceSlot = Number(edgeSpec.sourceSlot ?? 0);
    const targetSlot = Number(edgeSpec.targetSlot ?? 0);
    const sourceHandles = sourceRecord.handleLookup.output.get(sourceKey);
    const targetHandles = targetRecord.handleLookup.input.get(targetKey);

    if (!sourceHandles || !sourceHandles[sourceSlot]) {
      throw new Error(
        `Edge at index ${index} could not resolve source handle ${sourceKey}[${sourceSlot}] on node ${edgeSpec.source}`
      );
    }

    if (!targetHandles || !targetHandles[targetSlot]) {
      throw new Error(
        `Edge at index ${index} could not resolve target handle ${targetKey}[${targetSlot}] on node ${edgeSpec.target}`
      );
    }

    return {
      id:
        edgeSpec.id ??
        `xy-edge__${sourceRecord.materializedId}${sourceHandles[sourceSlot]}-${targetRecord.materializedId}${targetHandles[targetSlot]}`,
      source: sourceRecord.materializedId,
      target: targetRecord.materializedId,
      type: edgeSpec.type ?? "custom",
      sourceHandle: sourceHandles[sourceSlot],
      targetHandle: targetHandles[targetSlot],
      selected: Boolean(edgeSpec.selected ?? false),
    };
  });

  return {
    nodes: nodeRecords.map((record) => record.node),
    edges,
  };
}

function materializeRawWorkflow(source) {
  if (!Array.isArray(source.nodes) || !Array.isArray(source.edges)) {
    throw new Error("Raw mode expects top-level nodes and edges arrays.");
  }

  return cloneJson({
    nodes: source.nodes,
    edges: source.edges,
  });
}

function writeOutput(output, args) {
  const serialized = JSON.stringify(output, null, args.indent);

  if (args.out) {
    fs.writeFileSync(args.out, serialized);
  } else {
    process.stdout.write(`${serialized}\n`);
  }

  if (args.copy) {
    execFileSync("pbcopy", { input: serialized });
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const source = JSON.parse(readInput(args.input));
  const mode = args.mode ?? detectMode(source);
  const output =
    mode === "raw" ? materializeRawWorkflow(source) : mode === "canonical" ? materializeCanonicalWorkflow(source, args) : null;

  if (!output) {
    throw new Error(`Unsupported mode: ${mode}`);
  }

  writeOutput(output, args);
}

main();
