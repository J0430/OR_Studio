import { readFileSync, writeFileSync } from 'fs';

const files = ['commercialData.json', 'residentialData.json', 'urbanPlanningData.json', 'officeData.json'];


// Function to generate random views between 60 and 150
const getRandomViews = () => Math.floor(Math.random() * (150 - 60 + 1)) + 60;

files.forEach(file => {
  const jsonData = JSON.parse(readFileSync(file, 'utf8'));

  Object.values(jsonData.projects).forEach(project => {
    project.views = getRandomViews();
  });

  writeFileSync(file, JSON.stringify(jsonData, null, 4));

  console.log(`✅ ${file} updated with random views.`);
});

