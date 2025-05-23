import { useState, useEffect } from "react";

/**
 * A custom hook to manage delayed state changes.
 *
 * @param {boolean} initialState - The initial state value.
 * @param {number} delay - The delay in milliseconds before toggling the state.
 * @returns {boolean} - The current state after the delay.
 */
const useTimeout = (initialState, delay) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(true); // ✅ Now properly updates state
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return state;
};

export default useTimeout;
