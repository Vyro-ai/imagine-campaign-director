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
const CONTINUITY_SHORTHAND_PATTERN =
  /\b(?:same|matching|consistent)\s+(?:adult\s+)?(?:character|person|model|woman|man|subject|identity|face|hair|wardrobe|outfit|garment|coat|product|style|look)\b/i;
const HUMAN_SUBJECT_PATTERN =
  /\b(?:adult\s+)?(?:model|person|woman|man|subject|character|actress|actor|face|identity|portrait|casting)\b/i;

const LIVE_MODEL_REGISTRY = {
  image: {
    imagineart_2: {
      label: "ImagineArt 2.0",
      modelId: 41601,
      aliases: ["imagineart 2", "imagineart 2.0", "imagine art 2", "imagine art 2.0", "ia2"],
    },
    gpt_image_2: {
      label: "GPT Image 2",
      modelId: 41701,
      aliases: ["gpt image 2", "gpt-image-2", "chatgpt image 2", "gpt image gen 2"],
      defaultSettings: { resolution: "2K", quality: "high" },
    },
    nano_banana_2: {
      label: "Nano Banana 2",
      modelId: 40603,
      aliases: ["nano banana 2", "nb2"],
    },
    nano_banana_pro: {
      label: "Nano Banana Pro",
      modelId: 41201,
      aliases: ["nano banana pro", "nbp"],
    },
  },
  video: {
    seedance_2: {
      label: "Seedance 2.0",
      modelId: 21905,
      aliases: ["seedance 2", "seedance 2.0", "seedance2", "seedance"],
      defaultSettings: { resolution: "720p", generateAudio: false },
    },
    seedance_2_fast: {
      label: "Seedance 2.0 Fast",
      aliases: ["seedance 2 fast", "seedance 2.0 fast"],
    },
    kling_3: {
      label: "Kling 3.0",
      modelId: 11020,
      aliases: ["kling 3", "kling 3.0"],
    },
  },
};

const STALE_OR_WRONG_MODEL_IDS = {
  image: new Map([
    [40603, "Nano Banana 2"],
  ]),
  video: new Map([
    [11020, "Kling 3.0"],
  ]),
};

function normalizedModelKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function findLiveModel(type, nodeSpec, settings) {
  const raw =
    nodeSpec.modelKey ??
    nodeSpec.model ??
    nodeSpec.modelName ??
    nodeSpec.modelLabel ??
    settings.modelKey ??
    settings.model ??
    settings.modelName ??
    settings.modelLabel ??
    "";
  const normalized = normalizedModelKey(raw);

  if (!normalized) {
    const idMatch = Number(settings.modelId);
    if (STALE_OR_WRONG_MODEL_IDS[type]?.has(idMatch)) {
      return null;
    }

    if (Number.isFinite(idMatch)) {
      for (const [key, model] of Object.entries(LIVE_MODEL_REGISTRY[type] ?? {})) {
        if (model.modelId === idMatch) {
          return { key, ...model };
        }
      }
    }

    return null;
  }

  for (const [key, model] of Object.entries(LIVE_MODEL_REGISTRY[type] ?? {})) {
    const accepted = [key, model.label, ...(model.aliases ?? [])].map(normalizedModelKey);
    if (accepted.includes(normalized)) {
      return { key, ...model };
    }
  }

  return null;
}

function applyLiveModelSettings(nodeSpec, settings) {
  const model = findLiveModel(nodeSpec.type, nodeSpec, settings);

  if (model) {
    settings.modelId = model.modelId;
    if (model.defaultSettings) {
      for (const [key, value] of Object.entries(model.defaultSettings)) {
        settings[key] ??= value;
      }
    }

    if (nodeSpec.type === "image" && model.key === "gpt_image_2" && settings.quality !== "high") {
      throw new Error(
        `Image node "${nodeSpec.name ?? nodeSpec.id ?? "unnamed"}" uses GPT Image 2 but quality is "${settings.quality}". Use quality: "high" for GPT Image 2 workflow defaults.`
      );
    }

    delete settings.modelKey;
    delete settings.model;
    delete settings.modelName;
    delete settings.modelLabel;
    return;
  }

  const modelId = Number(settings.modelId);
  const wrongModel = STALE_OR_WRONG_MODEL_IDS[nodeSpec.type]?.get(modelId);
  if (wrongModel) {
    throw new Error(
      `${nodeSpec.type} node "${nodeSpec.name ?? nodeSpec.id ?? "unnamed"}" uses modelId ${modelId}, which the live UI currently resolves to ${wrongModel}. Use a verified modelKey/modelName from docs/IMAGINEART_LIVE_MODEL_STRINGS.md instead of stale numeric IDs.`
    );
  }
}

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

function nodeLogicalId(nodeSpec, index) {
  return nodeSpec.id ?? `node-${index + 1}`;
}

function isIdentityLockSource(nodeSpec) {
  const role = String(nodeSpec.identityRole ?? nodeSpec.metadata?.identityRole ?? "").toLowerCase();
  return Boolean(
    nodeSpec.identityLockSource ||
      nodeSpec.metadata?.identityLockSource ||
      role === "identity-lock" ||
      role === "identity_source" ||
      role === "identity-source" ||
      role === "locked-identity" ||
      role === "locked_identity"
  );
}

function isIdentityLockExempt(nodeSpec) {
  return Boolean(
    nodeSpec.identityLockExempt ||
      nodeSpec.metadata?.identityLockExempt ||
      nodeSpec.referenceModelException ||
      nodeSpec.metadata?.referenceModelException
  );
}

function isHumanContinuityNode(nodeSpec) {
  if (!["image", "video"].includes(nodeSpec?.type)) {
    return false;
  }

  const prompt = nodeSpec.settings?.prompt ?? "";
  if (typeof prompt !== "string") {
    return false;
  }

  if (STORYBOARD_REFERENCE_PATTERN.test(prompt) && !/@\s*Image\s*\d+/i.test(prompt)) {
    return false;
  }

  return HUMAN_SUBJECT_PATTERN.test(prompt);
}

function collectIdentityLockSourceIds(source) {
  const ids = new Set();

  (source.identityLocks ?? []).forEach((lock) => {
    const id = typeof lock === "string" ? lock : lock?.source ?? lock?.node ?? lock?.id;
    if (id) {
      ids.add(id);
    }
  });

  (source.nodes ?? []).forEach((nodeSpec, index) => {
    if (isIdentityLockSource(nodeSpec)) {
      ids.add(nodeLogicalId(nodeSpec, index));
    }
  });

  return ids;
}

function validateCanonicalIdentityLockContracts(source) {
  const policy = source.identityPolicy ?? {};
  if (policy.mode === "none") {
    if (!policy.reason) {
      throw new Error('identityPolicy.mode is "none" but no reason was provided.');
    }
    return;
  }

  const humanNodes = source.nodes
    .map((nodeSpec, index) => ({ nodeSpec, logicalId: nodeLogicalId(nodeSpec, index) }))
    .filter(({ nodeSpec }) => isHumanContinuityNode(nodeSpec) && !isIdentityLockExempt(nodeSpec));

  if (humanNodes.length < 2) {
    return;
  }

  const identitySourceIds = collectIdentityLockSourceIds(source);
  if (identitySourceIds.size === 0) {
    throw new Error(
      `Canonical workflow has ${humanNodes.length} human/model nodes but no locked identity source. Generate/select the required identity reference node(s), mark them with metadata.identityRole: "identity-lock" or top-level identityLocks, then wire them into every dependent still/video node.`
    );
  }

  const incomingByTarget = collectIncomingReferenceDetails(source);
  const sourceLabels = [...identitySourceIds].join(", ");

  for (const { nodeSpec, logicalId } of humanNodes) {
    if (identitySourceIds.has(logicalId)) {
      continue;
    }

    const incoming = incomingByTarget.get(logicalId)?.edges ?? [];
    const identityEdges = incoming.filter((edgeSpec) => identitySourceIds.has(edgeSpec.source));
    const acceptableKeys =
      nodeSpec.type === "video" ? new Set(["referenceUrl", "imageUrl", "lastFrame"]) : new Set(["imageUrl"]);
    const hasIdentityReference = identityEdges.some((edgeSpec) =>
      acceptableKeys.has(edgeSpec.targetKey ?? edgeSpec.inputKey)
    );

    if (!hasIdentityReference) {
      throw new Error(
        `${nodeSpec.type} node "${nodeSpec.name ?? logicalId}" contains a human/model subject but is not wired to a locked identity source. Connect one of [${sourceLabels}] to ${[...acceptableKeys].join(" or ")} and use explicit @Image reference-role language.`
      );
    }

    if (!/@\s*Image\s*\d+/i.test(nodeSpec.settings?.prompt ?? "")) {
      throw new Error(
        `${nodeSpec.type} node "${nodeSpec.name ?? logicalId}" is identity-driven but its prompt does not use an explicit @Image token. Write the role directly, e.g. "@Image1 controls identity, face, hair, wardrobe, and posture."`
      );
    }
  }
}

function validateCanonicalRunBudget(source) {
  (source.nodes ?? []).forEach((nodeSpec, index) => {
    if (!nodeSpec || typeof nodeSpec !== "object") {
      return;
    }

    const logicalId = nodeLogicalId(nodeSpec, index);
    const requestedRuns = Number(
      nodeSpec.runCount ?? nodeSpec.runs ?? nodeSpec.numberOfRuns ?? nodeSpec.metadata?.runCount ?? 1
    );

    if (!Number.isFinite(requestedRuns) || requestedRuns <= 1) {
      return;
    }

    const role = String(nodeSpec.productionRole ?? nodeSpec.metadata?.productionRole ?? "").toLowerCase();
    const allowedExplorationRole =
      role.includes("identity-candidate") ||
      role.includes("look-dev") ||
      role.includes("lookdev") ||
      role.includes("variant-exploration");
    const reason = nodeSpec.runBudgetReason ?? nodeSpec.metadata?.runBudgetReason;

    if (!allowedExplorationRole || !reason) {
      throw new Error(
        `Node "${nodeSpec.name ?? logicalId}" requests ${requestedRuns} runs. Default generation budget is one run per node; multiple runs require a productionRole like "identity-candidate" or "look-dev" plus runBudgetReason.`
      );
    }
  });
}

function validateGeneratedNodeResultBudget(source) {
  (source.nodes ?? []).forEach((nodeSpec, index) => {
    const logicalId = nodeLogicalId(nodeSpec, index);
    const results = Array.isArray(nodeSpec.results) ? nodeSpec.results : nodeSpec.data?.results;
    if (!Array.isArray(results) || results.length <= 1) {
      return;
    }

    const role = String(
      nodeSpec.productionRole ?? nodeSpec.metadata?.productionRole ?? nodeSpec.data?.metadata?.productionRole ?? ""
    ).toLowerCase();
    const isExploration =
      role.includes("identity-candidate") ||
      role.includes("look-dev") ||
      role.includes("lookdev") ||
      role.includes("variant-exploration");

    if (!isExploration) {
      throw new Error(
        `Node "${nodeSpec.name ?? nodeSpec.data?.name ?? logicalId}" contains ${results.length} generated results but is not marked as an exploration node. Do not run production stills twice by default; select a locked reference and generate dependent nodes once.`
      );
    }
  });
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

function validateCanonicalContinuityPromptLanguage(source) {
  source.nodes.forEach((nodeSpec, index) => {
    const logicalId = nodeSpec.id ?? `node-${index + 1}`;
    const prompt = nodeSpec.settings?.prompt;

    if (typeof prompt !== "string" || prompt.trim() === "") {
      return;
    }

    const match = prompt.match(CONTINUITY_SHORTHAND_PATTERN);
    if (!match) {
      return;
    }

    throw new Error(
      `Node "${nodeSpec.name ?? logicalId}" uses ambiguous continuity shorthand "${match[0]}". Use explicit @Image references instead, such as "@Image1 controls identity/wardrobe", and wire the matching referenceUrl edge(s).`
    );
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

function validateCanonicalImageReferenceContracts(source) {
  const incomingByTarget = collectIncomingReferenceDetails(source);

  source.nodes.forEach((nodeSpec, index) => {
    if (nodeSpec?.type !== "image") {
      return;
    }

    const logicalId = nodeSpec.id ?? `node-${index + 1}`;
    const name = nodeSpec.name ?? logicalId;
    const prompt = nodeSpec.settings?.prompt ?? "";
    const requiredImageTokens = maxImageTokenIndex(prompt);

    if (requiredImageTokens === 0) {
      return;
    }

    const incoming = incomingByTarget.get(logicalId);
    const imageReferenceCount = incoming?.byKey.get("imageUrl") ?? 0;

    if (imageReferenceCount < requiredImageTokens) {
      throw new Error(
        `Image node "${name}" references @Image${requiredImageTokens} but only has ${imageReferenceCount} incoming imageUrl reference edge(s). Add the missing imageUrl slots/edges or remove the @Image tokens.`
      );
    }
  });
}

function validateCanonicalImageModelReferenceChoices(source) {
  const incomingByTarget = collectIncomingReferenceDetails(source);

  source.nodes.forEach((nodeSpec, index) => {
    if (nodeSpec?.type !== "image") {
      return;
    }

    const logicalId = nodeSpec.id ?? `node-${index + 1}`;
    const name = nodeSpec.name ?? logicalId;
    const incoming = incomingByTarget.get(logicalId);
    const imageReferenceCount = incoming?.byKey.get("imageUrl") ?? 0;
    const prompt = nodeSpec.settings?.prompt ?? "";
    const usesImageToken = maxImageTokenIndex(prompt) > 0;
    const modelHint = String(
      nodeSpec.model ?? nodeSpec.modelName ?? nodeSpec.settings?.modelName ?? nodeSpec.settings?.model ?? ""
    ).toLowerCase();
    const modelId = String(nodeSpec.settings?.modelId ?? "");
    const isReferenceDriven = imageReferenceCount > 0 || usesImageToken;
    const appearsNanoBanana = /nano\s*banana|nb2|nbp/.test(modelHint) || modelId === "40603" || modelId === "41201";
    const appearsImagineArt2 = /imagine\s*art\s*2|imagineart\s*2/.test(modelHint) || modelId === "41601";
    const hasDocumentedException = Boolean(
      nodeSpec.referenceModelException ?? nodeSpec.metadata?.referenceModelException ?? nodeSpec.settings?.referenceModelException
    );

    if (isReferenceDriven && !hasDocumentedException && (appearsImagineArt2 || appearsNanoBanana)) {
      throw new Error(
        `Image node "${name}" is reference-driven but appears to use ${modelHint || `modelId ${modelId}`}. Use GPT Image 2 for reference-driven style/product/character continuity images unless a documented exception is encoded in the node.`
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

function nodeLooksLikeVideoGeneration(nodeSpec) {
  if (!nodeSpec || typeof nodeSpec !== "object") {
    return false;
  }

  if (nodeSpec.type === "video") {
    return true;
  }

  const endpoint = String(nodeSpec.url?.endpoint ?? nodeSpec.data?.url?.endpoint ?? "");
  if (/\/video(?:\/|$)/i.test(endpoint)) {
    return true;
  }

  const modelId = Number(nodeSpec.settings?.modelId ?? nodeSpec.data?.settings?.modelId);
  if ([21905, 11020].includes(modelId)) {
    return true;
  }

  const outputs = [
    ...(nodeSpec.outputSchemas ?? []),
    ...(nodeSpec.data?.outputSchemas ?? []),
    ...(nodeSpec.data?.handles?.outputs ?? []),
    ...(nodeSpec.handles?.outputs ?? []),
  ];
  const hasVideoOutput = outputs.some((output) => output?.type === "video");
  const hasPromptInput = [
    ...(nodeSpec.inputSchemas ?? []),
    ...(nodeSpec.inputHandleSchemas ?? []),
    ...(nodeSpec.data?.inputHandleSchemas ?? []),
    ...(nodeSpec.data?.handles?.inputs ?? []),
  ].some((input) => input?.key === "prompt" || input?.type === "text");

  return hasVideoOutput && hasPromptInput;
}

function isCampaignWorkflow(source, options = {}) {
  const hasVideo = (source.nodes ?? []).some((nodeSpec) => nodeLooksLikeVideoGeneration(nodeSpec));
  if (hasVideo) {
    return true;
  }

  if (source.campaignVideo === true || source.workflowKind === "campaign" || source.metadata?.workflowKind === "campaign") {
    return true;
  }

  if (typeof options.input === "string" && /(?:^|[/\\])(?:campaigns|workspaces)[/\\]/.test(options.input)) {
    return true;
  }

  const prompts = (source.nodes ?? [])
    .map((nodeSpec) => nodeSpec?.settings?.prompt ?? "")
    .filter((prompt) => typeof prompt === "string")
    .join("\n");
  const campaignLanguage =
    /\b(?:campaign|commercial|fashion film|social ad|reels|tiktok|seedance|music studio)\b/i.test(prompts) ||
    Boolean(source.musicDirection || source.directorsTreatment || source.metadata?.directorsTreatment);

  return campaignLanguage;
}

function resolveCampaignDir(source, options = {}) {
  const explicit = source.campaignDir ?? source.workspaceDir ?? source.metadata?.campaignDir ?? source.metadata?.workspaceDir;
  if (explicit) {
    return path.resolve(String(explicit));
  }

  if (typeof options.input === "string") {
    return path.dirname(path.resolve(options.input));
  }

  return null;
}

function readCriticStatus(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const statusMatch = text.match(/^\s*status:\s*(pass|revise|block)\s*$/im);
  const modeMatch = text.match(/^\s*critic_mode:\s*(.+)\s*$/im);
  const subagentMatch = text.match(/^\s*subagent_ids?:\s*(.+)\s*$/im);
  const artifactMatch = text.match(/^\s*subagent_artifacts?:\s*(.+)\s*$/im);
  return {
    status: statusMatch?.[1]?.toLowerCase() ?? null,
    mode: modeMatch?.[1]?.trim() ?? null,
    subagentIds: subagentMatch?.[1]?.trim() ?? null,
    subagentArtifacts: artifactMatch?.[1]?.trim() ?? null,
  };
}

function parseSubagentIds(value) {
  return String(value ?? "")
    .split(/[,\s]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function hasValidSubagentIds(value) {
  const ids = parseSubagentIds(value);
  return ids.length > 0 && ids.every((id) => /^019[0-9a-f]{5,}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));
}

function validateSubagentProvenance(campaignDir, filename, subagentIds, artifactList) {
  const ids = parseSubagentIds(subagentIds);
  const artifacts = String(artifactList ?? "")
    .split(/[,\s]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  for (const id of ids) {
    const matchingArtifacts = artifacts.filter((entry) => entry.includes(id));
    if (matchingArtifacts.length === 0) {
      throw new Error(
        `Required swarm artifact qa/critics/${filename} must list a subagent_artifacts path for ${id}.`
      );
    }

    for (const artifact of matchingArtifacts) {
      const artifactPath = path.resolve(campaignDir, artifact);
      if (!artifactPath.startsWith(path.resolve(campaignDir) + path.sep)) {
        throw new Error(`Subagent artifact path for ${id} must stay inside the campaign directory: ${artifact}`);
      }
      if (!fs.existsSync(artifactPath)) {
        throw new Error(`Subagent artifact for ${id} does not exist: ${artifact}`);
      }

      const text = fs.readFileSync(artifactPath, "utf8");
      if (!new RegExp(`^\\s*agent_id:\\s*${id}\\s*$`, "im").test(text)) {
        throw new Error(`Subagent artifact ${artifact} must include matching agent_id: ${id}.`);
      }
      if (!/^\s*status:\s*completed\s*$/im.test(text)) {
        throw new Error(`Subagent artifact ${artifact} must include status: completed.`);
      }
    }
  }
}

function validateRequiredCriticArtifact(campaignDir, filename) {
  const filePath = path.join(campaignDir, "qa", "critics", filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Campaign workflow is missing required swarm artifact qa/critics/${filename}. Run the adversarial swarm with subagents before materializing/pasting the workflow.`
    );
  }

  const { status, mode, subagentIds, subagentArtifacts } = readCriticStatus(filePath);
  if (status !== "pass") {
    throw new Error(
      `Required swarm artifact qa/critics/${filename} has status "${status ?? "missing"}". Resolve critic blockers before materializing/pasting the workflow.`
    );
  }

  if (mode !== "subagent") {
    throw new Error(
      `Required swarm artifact qa/critics/${filename} must have critic_mode: subagent. Single-agent fallback is not valid for campaign workflow materialization.`
    );
  }

  if (!hasValidSubagentIds(subagentIds)) {
    throw new Error(
      `Required swarm artifact qa/critics/${filename} must include subagent_ids with spawned critic agent id(s) matching the Codex subagent id format.`
    );
  }

  validateSubagentProvenance(campaignDir, filename, subagentIds, subagentArtifacts);
}

function validateCanonicalSwarmArtifacts(source, options = {}) {
  if (!isCampaignWorkflow(source, options)) {
    return;
  }

  const campaignDir = resolveCampaignDir(source, options);
  if (!campaignDir) {
    throw new Error(
      "Campaign workflow requires swarm artifacts, but no campaign directory could be resolved. Provide --input from the campaign folder or set top-level campaignDir/workspaceDir."
    );
  }

  for (const filename of ["ideation-swarm.md", "treatment-critic.md", "pre-spend-critic.md"]) {
    validateRequiredCriticArtifact(campaignDir, filename);
  }
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
  validateCanonicalContinuityPromptLanguage(source);
  validateCanonicalSwarmArtifacts(source, options);
  validateCanonicalIdentityLockContracts(source);
  validateCanonicalRunBudget(source);
  validateCanonicalImageReferenceContracts(source);
  validateCanonicalImageModelReferenceChoices(source);
  validateCanonicalVideoTiming(source);
  validateCanonicalVideoReferenceContracts(source);
  validateGeneratedNodeResultBudget(source);

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
    applyLiveModelSettings(nodeSpec, settings);
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

function materializeRawWorkflow(source, options = {}) {
  if (!Array.isArray(source.nodes) || !Array.isArray(source.edges)) {
    throw new Error("Raw mode expects top-level nodes and edges arrays.");
  }

  validateCanonicalSwarmArtifacts(source, options);

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
    mode === "raw"
      ? materializeRawWorkflow(source, args)
      : mode === "canonical"
        ? materializeCanonicalWorkflow(source, args)
        : null;

  if (!output) {
    throw new Error(`Unsupported mode: ${mode}`);
  }

  writeOutput(output, args);
}

main();
