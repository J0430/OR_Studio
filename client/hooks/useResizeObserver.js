import { useEffect } from "react";

const useResizeObserver = (ref, callback) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      callback(entry);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);
};

export default useResizeObserver;
