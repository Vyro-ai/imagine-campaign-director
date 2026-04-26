#!/usr/bin/env python3
import sys


def main() -> int:
    scores = []
    for arg in sys.argv[1:]:
        try:
            scores.append(float(arg))
        except ValueError:
            print(f"ignored non-number: {arg}")
    if not scores:
        print("usage: score_qc_report.py 4 5 3 4")
        return 1
    avg = sum(scores) / len(scores)
    status = "pass" if avg >= 4 else "needs revision"
    print(f"average={avg:.2f}")
    print(f"status={status}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
