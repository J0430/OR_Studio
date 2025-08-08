// utils/getLogoPaths.ts
import fs from "fs";

export interface LogoPaths {
  outerPath: string;
  innerPaths: string[];
}

/**
 * Reads an SVG logo by name and extracts outer and inner paths.
 * @param  - Name of the SVG file (without `.svg` extension)
 * @returns { outerPath, innerPaths }
 */
export function getLogoPaths(logoName: string): LogoPaths | null {
  const svgString = fs.readFileSync(`/assets/Logos/${logoName}`, "utf-8");

  const outerMatch = svgString.match(
    /<path[^>]*d="([^"]+)"[^>]*fill="#a2b5bb"/i
  );
  const outerPath = outerMatch?.[1];

  const innerRegex = /<path[^>]*d="([^"]+)"[^>]*fill="#ffffff"/gi;
  const innerPaths: string[] = [];
  let match;
  while ((match = innerRegex.exec(svgString)) !== null) {
    innerPaths.push(match[1]);
  }

  if (!outerPath || innerPaths.length === 0) return null;

  return { outerPath, innerPaths };
}
