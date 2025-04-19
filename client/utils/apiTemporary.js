export async function fetchDataTemporary(fileName) {
  const formattedFileName = `${fileName.charAt(0).toLowerCase()}${fileName.slice(1)}Data.json`;

  let dataJson;
  if (typeof window === "undefined") {
    // ✅ Only import these on server
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      formattedFileName
    );
    dataJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } else {
    const url = `/data/${formattedFileName}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    dataJson = await response.json();
  }

  return {
    projects: Object.fromEntries(
      Object.entries(dataJson.projects).map(([k, v]) => [
        k,
        { title: v.title, images: v.images, description: v.description },
      ])
    ),
    imagePaths: Object.values(dataJson.projects).flatMap((p) => p.images),
    category: dataJson.category || "Untitled",
  };
}
