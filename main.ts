// SPDX-License-Identifier: MIT
// The One-Liner Groan-Off — writes one original one-line dad joke to entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  if (ENTRY_LINE !== ENTRY_LINE.trim()) {
    throw new Error(
      "entry line must not have leading or trailing whitespace",
    );
  }
  if (ENTRY_LINE.includes("\n") || ENTRY_LINE.includes("\r")) {
    throw new Error("entry line must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  // Write-back verification: the file on disk must be exactly the entry line.
  if (readFileSync(outPath, "utf8") !== ENTRY_LINE) {
    throw new Error("entry.txt does not match the entry line");
  }
}

main();
