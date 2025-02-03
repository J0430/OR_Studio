import { useEffect } from "react";

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    if (!ref?.current) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, callback]);
};

export default useClickOutside; // ✅ Use default export
