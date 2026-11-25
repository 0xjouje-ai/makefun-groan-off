// SPDX-License-Identifier: MIT
// The One-Liner Groan-Off — writes one original one-line dad joke to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "I told my wife I was cutting back on dad jokes. She said, 'Finally, something you're cutting that isn't the grass.'";

function main(): void {
  // Gate validation: exactly one line, 1-140 characters, not only whitespace.
  if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 140) {
    throw new Error(
      `entry line must be 1-140 characters, got ${ENTRY_LINE.length}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n") || ENTRY_LINE.includes("\r")) {
    throw new Error("entry line must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
}

main();
