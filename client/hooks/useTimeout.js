import { useState, useEffect } from "react";

/**
 * Custom hook to manage a delayed state change using a timeout.
 *
 * @param {number} delay - The delay in milliseconds before setting the state to true.
 * @returns {boolean} - The state indicating if the timeout has completed.
 */
const useTimeout = (delay) => {
  const [isTimeoutDone, setIsTimeoutDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeoutDone(true);
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, [delay]);

  return isTimeoutDone;
};

export default useTimeout;
