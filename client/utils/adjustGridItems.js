export const adjustGridItems = (selector) => {
  if (typeof window === "undefined") return;

  const gridItems = document.querySelectorAll(selector);
  gridItems.forEach((item) => {
    // Example logic to adjust grid items
    item.style.transform = "scale(1)";
  });
};
