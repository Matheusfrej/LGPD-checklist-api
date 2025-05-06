import { describe, it } from "vitest";
import fg from "fast-glob";
import fs from "fs";

const readImports = (file: string): string[] => {
  const content = fs.readFileSync(file, "utf8");
  const importRegex = /from\s+['"](.+)['"]/g;
  const imports: string[] = [];
  let match;

  while ((match = importRegex.exec(content))) {
    imports.push(match[1]);
  }

  return imports;
};

const mapFolderName = (folders: string[]): string[] =>
  folders
    .map((folder) => [`../${folder}`, `src/${folder}`, `@/${folder}`]) // vira um array com arrays
    .flat(); // transforma em um único array com strings

const hasForbiddenImport = (
  imp: string,
  forbiddenSegments: string[],
): boolean => forbiddenSegments.some((segment) => imp.includes(segment)); // Check if the import path contains the forbidden segment

describe("Architecture Rules", () => {
  it("delivery must NOT import from infrastructure", async () => {
    const files = await fg("**/delivery/**/*.ts", { absolute: true });

    const folder = "infrastructure";
    const forbidden = mapFolderName([folder]);

    const violations: string[] = [];

    for (const file of files) {
      const imports = readImports(file);
      for (const imp of imports) {
        if (hasForbiddenImport(imp, forbidden)) {
          violations.push(`${file} imports ${imp}`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `❌ Found ${violations.length} delivery->infrastructure violations:\n` +
          violations.join("\n"),
      );
    }
  });

  it("infrastructure must NOT import from delivery", async () => {
    const files = await fg("**/infrastructure/**/*.ts", { absolute: true });

    const folder = "delivery";
    const forbidden = mapFolderName([folder]);

    const violations: string[] = [];

    for (const file of files) {
      const imports = readImports(file);
      for (const imp of imports) {
        if (hasForbiddenImport(imp, forbidden)) {
          violations.push(`${file} imports ${imp}`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `❌ Found ${violations.length} infrastructure->delivery violations:\n` +
          violations.join("\n"),
      );
    }
  });

  it("domain must NOT import from delivery or infrastructure", async () => {
    const files = await fg("**/domain/**/*.ts", { absolute: true });

    const violations: string[] = [];

    const folders = ["delivery", "infrastructure"];
    const forbidden = mapFolderName(folders);

    for (const file of files) {
      const imports = readImports(file);
      for (const imp of imports) {
        if (hasForbiddenImport(imp, forbidden)) {
          violations.push(`${file} imports ${imp}`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `❌ Found ${violations.length} domain->(delivery/infrastructure) violations:\n` +
          violations.join("\n"),
      );
    }
  });

  it("src should NOT import from test folder unless it is a test file", async () => {
    const files = await fg("src/**/*.ts", { absolute: true });

    const violations: string[] = [];

    for (const file of files) {
      const isTestFile = file.endsWith(".spec.ts") || file.endsWith(".test.ts");
      const imports = readImports(file);

      for (const imp of imports) {
        const isTestImport = imp.includes("../test");
        if (isTestImport && !isTestFile) {
          violations.push(`${file} imports ${imp}`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `❌ Found ${violations.length} src->test violations:\n` +
          violations.join("\n"),
      );
    }
  });
});
