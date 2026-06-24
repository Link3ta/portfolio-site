import { cpSync, existsSync } from "node:fs";

if (!existsSync(".next/standalone")) {
  console.error("Missing .next/standalone — run next build first.");
  process.exit(1);
}

cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
cpSync("public", ".next/standalone/public", { recursive: true });
console.log("Copied static assets into standalone output.");
