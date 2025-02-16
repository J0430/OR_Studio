export const preloadImages = (images = [], onImageLoad = () => {}) => {
  if (!Array.isArray(images)) return;

  images.forEach((image) => {
    const img = new Image();
    img.src = image;
    img.onload = () => onImageLoad();
    img.onerror = () => console.error(`Failed to preload image: ${image}`);
  });
};
