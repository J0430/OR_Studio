// Front Image (fixed path correctly)
import { readFileSync, writeFileSync } from 'fs';
import sharp from 'sharp';
import path from 'path'; 
const frontImgPath = path.join(process.cwd(), 'public', project.frontImage.src);
const frontMetadata = await sharp(frontImgPath).metadata();

project.frontImage.width = frontMetadata.width;
project.frontImage.height = frontMetadata.height;
project.frontImage.orientation = getOrientation(frontMetadata.width, frontMetadata.height);

// Project images (fixed path correctly)
for (const image of project.images) {
  const imgPath = path.join(process.cwd(), 'public', image.src);
  const imgMetadata = await sharp(imgPath).metadata();

  image.width = imgMetadata.width;
  image.height = imgMetadata.height;
  image.orientation = getOrientation(imgMetadata.width, imgMetadata.height);
}

