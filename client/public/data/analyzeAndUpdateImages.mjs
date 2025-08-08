import { readFileSync, writeFileSync } from 'fs';
import sharp from 'sharp';
import path from 'path';

const dataDir = './';
const categories = [
  'commercialData.json',
  'officeData.json',
  'residentialData.json',
  'urbanPlanningData.json'
];

const getOrientation = (width, height) => {
  if (width > height) return 'landscape';
  if (width < height) return 'portrait';
  return 'square';
};

async function analyzeImages() {
  for (const categoryFile of categories) {
    const dataPath = path.join(dataDir, categoryFile);
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));

    for (const project of Object.values(jsonData.projects)) {

      // Remove frontImage completely
      delete project.frontImage;

      // Project images (corrected paths)
      for (const image of project.images) {
        const imgPath = path.join(process.cwd(), '../', image.src); // Corrected path

        try {
          const metadata = await sharp(imgPath).metadata();

          image.width = metadata.width;
          image.height = metadata.height;
          image.orientation = getOrientation(metadata.width, metadata.height);

        } catch (error) {
          console.error(`🚨 Error with image ${image.src}:`, error.message);
        }
      }

      console.log(`✅ Project images analyzed and updated.`);
    }

    writeFileSync(dataPath, JSON.stringify(jsonData, null, 4));
    console.log(`✅ Finished and saved updates to ${categoryFile}`);
  }
}

analyzeImages()
  .then(() => console.log('🎉 All project images successfully updated!'))
  .catch(err => console.error('🚨 Error during analysis:', err));

