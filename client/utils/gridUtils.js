/**
 * Adjusts grid items' row spans based on their image heights.
 * @param {string} gridItemSelector - CSS selector for grid items.
 * @param {number} rowHeight - The row height used in grid-auto-rows.
 */
export const adjustGridItems = (gridItemSelector, rowHeight = 10) => {
  const allImages = document.querySelectorAll(`${gridItemSelector} img`);

  allImages.forEach((img) => {
    img.onload = () => {
      const gridItem = img.closest(gridItemSelector);
      if (gridItem) {
        const rowSpan = Math.ceil(img.offsetHeight / rowHeight);
        gridItem.style.gridRowEnd = `span ${rowSpan}`;
      }
    };
  });
};
