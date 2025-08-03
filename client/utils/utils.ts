// utils.ts:

// Fisher-Yates Shuffle: Efficient random shuffling of an array
export function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Interleave Arrays: Merge multiple arrays by interleaving their elements
export function interleaveArrays<T>(arrays: T[][]): T[] {
  const maxLength = Math.max(...arrays.map((arr) => arr.length));
  const result: T[] = [];

  for (let i = 0; i < maxLength; i++) {
    arrays.forEach((array) => {
      if (i < array.length) {
        result.push(array[i]);
      }
    });
  }

  return result;
}

// Shuffle images within each project and assign a frontImage
interface Project {
  title: string;
  images: string[];
  frontImage?: string;
  id?: string;
  [key: string]: any;
}

export function shuffleProjectImages(projects: Project[]): Project[] {
  return projects.map((project) => {
    if (!project.images || project.images.length === 0) return project;

    const shuffledImages = fisherYatesShuffle(project.images);
    return {
      ...project,
      images: shuffledImages,

      id: project.id || `${project.title}-${shuffledImages[0]}`,
    };
  });
}
