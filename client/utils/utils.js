// Fisher-Yates Shuffle: Efficient random shuffling of an array
export const fisherYatesShuffle = (array) => {
  const shuffledArray = [...array]; // Create a copy to avoid mutating the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

// Interleave Arrays: Merge multiple arrays by interleaving their elements
export const interleaveArrays = (arrays) => {
  const maxLength = Math.max(...arrays.map((arr) => arr?.length)); // Find the longest array length
  const result = [];

  for (let i = 0; i < maxLength; i++) {
    arrays.forEach((array) => {
      if (i < array.length) {
        result.push(array[i]); // Push element from the current index if it exists
      }
    });
  }

  return result;
};
