import { useEffect, useState } from "react";

/**
 * Handles infinite scrolling behavior of a thumbnail strip:
 * - Animates left by offset
 * - Moves first item to end
 * - Resets scroll to 0
 * - Triggers reappearance animation for the new last item
 */
export function useInfiniteScrollStrip({
  items,
  scrollOffset = 116,
  scrollDuration = 3000,
  reappearDuration = 1500,
}) {
  const [currentItems, setCurrentItems] = useState(items);
  const [stripX, setStripX] = useState(0);
  const [startMainAnimation, setStartMainAnimation] = useState(false);

  useEffect(() => {
    // Start scroll
    setStripX(-scrollOffset);

    const scrollTimeout = setTimeout(() => {
      // Reorder
      const newItems = [...currentItems];
      const moved = newItems.shift();
      newItems.push(moved);
      setCurrentItems(newItems);

      // Reset scroll to avoid jump
      setStripX(0);

      // Trigger reappearance animation
      setStartMainAnimation(true);

      // Reset animation flag
      setTimeout(() => {
        setStartMainAnimation(false);
      }, reappearDuration);
    }, scrollDuration);

    return () => clearTimeout(scrollTimeout);
  }, [items]);

  return {
    currentItems,
    stripX,
    startMainAnimation,
  };
}
