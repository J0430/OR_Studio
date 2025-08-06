import fs from "fs";
import path from "path";
import sharp from "sharp";

const dataDir = path.resolve("public/data");

const files = [
  "officeData.json",
  "commercialData.json",
  "urbanPlanningData.json",
  "interiorData.json",
];

async function updateImageSizes() {
  for (const file of files) {
    const filePath = path.join(dataDir, file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Skipped missing file: ${filePath}`);
      continue;
    }

    const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let modified = false;

    const projectEntries = Object.entries(json.projects);

    await Promise.all(
      projectEntries.map(async ([projectKey, project]) => {
        if (!project.images || !Array.isArray(project.images)) return;

        await Promise.all(
          project.images.map(async (img) => {
            const imgPath = path.join(
              process.cwd(),
              "public",
              img.src.replace(/^\/+/, "")
            );

            if (!fs.existsSync(imgPath)) {
              console.warn(`⚠️  Image not found: ${imgPath}`);
              return;
            }

            try {
              const metadata = await sharp(imgPath).metadata();
              img.width = metadata.width;
              img.height = metadata.height;
              modified = true;
              console.log(
                `✅ Updated ${img.src} → ${metadata.width}x${metadata.height}`
              );
            } catch (err) {
              console.error(`❌ Failed to read ${img.src}: ${err.message}`);
            }
          })
        );
      })
    );

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
      console.log(`💾 Saved updated file: ${file}`);
    } else {
      console.log(`ℹ️  No changes made to: ${file}`);
    }
  }
}

updateImageSizes();
