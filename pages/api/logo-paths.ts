// pages/api/logo-paths.ts
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;
  const filePath = path.join(process.cwd(), "public/assets/logos", `${name}`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Logo not found" });
  }

  const svg = fs.readFileSync(filePath, "utf-8");

  const outerMatch = svg.match(/<path[^>]*d="([^"]+)"[^>]*fill="#a2b5bb"/i);
  const outerPath = outerMatch?.[1];

  const innerRegex = /<path[^>]*d="([^"]+)"[^>]*fill="#ffffff"/gi;
  const innerPaths: string[] = [];
  let match;
  while ((match = innerRegex.exec(svg)) !== null) {
    innerPaths.push(match[1]);
  }

  res.status(200).json({ outerPath, innerPaths });
}
