import fs from "fs";
import path from "path";
import { DOMParser } from "xmldom";

// === SETTINGS === //
const globalsDataPath = path.resolve(
  __dirname,
  "../public/data/globalsData.json"
);
const publicDir = path.resolve(__dirname, "../public");
const outputFilePath = path.resolve(__dirname, "../utils/orLogoPaths.ts");

function extractPathsFromSVG(svgContent: string): {
  outerPath: string;
  innerPaths: string[];
} {
  const doc = new DOMParser().parseFromString(svgContent, "text/xml");
  const paths = Array.from(doc.getElementsByTagName("path")).map(
    (el) => el.getAttribute("d") || ""
  );

  return {
    outerPath: paths[0] || "",
    innerPaths: paths.slice(1),
  };
}

function cleanFilename(name: string) {
  return path
    .basename(name)
    .replace(/\W+/g, "_")
    .replace(/_svg|_webp|_/g, "")
    .toLowerCase();
}

function toExportConst(name: string, outerPath: string, innerPaths: string[]) {
  return `
export const ${name}OuterPath = \`${outerPath}\`;

export const ${name}InnerPaths = ${JSON.stringify(innerPaths, null, 2)};
`;
}

// === MAIN FUNCTION === //
(async () => {
  const globals = JSON.parse(fs.readFileSync(globalsDataPath, "utf-8"));
  const logos: string[] = globals.preloaderLogos || [];

  let output = `// Auto-generated from parseSvgToPaths.ts\n\n`;

  for (const logoRelPath of logos) {
    if (!logoRelPath.endsWith(".svg")) continue;

    const svgPath = path.join(publicDir, logoRelPath);
    if (!fs.existsSync(svgPath)) {
      console.warn(`⚠️ File not found: ${svgPath}`);
      continue;
    }

    const svgContent = fs.readFileSync(svgPath, "utf-8");
    const { outerPath, innerPaths } = extractPathsFromSVG(svgContent);
    const varName = cleanFilename(logoRelPath);

    output += toExportConst(varName, outerPath, innerPaths);
  }

  fs.writeFileSync(outputFilePath, output);
  console.log("✅ Extracted paths saved to:", outputFilePath);
})();
