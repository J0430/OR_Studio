import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web"; // Import react-spring for smooth animations
import styles from "../ScroleableBlur/ScrolleableBlur.module.scss";

// ScrollBlur component accepts data-gap as a prop
const ScrollBlur = ({ dataGap = 200 }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Reference to the gap element to fetch the data-gap dynamically
  const gapRef = useRef(null);

  // Handle the scroll event to track scroll position
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    // Listen for the scroll event
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate the blur amount based on the scroll position relative to data-gap
  const blurAmount = Math.min(
    Math.max((scrollPosition - dataGap) / 100, 0),
    10
  ); // Dynamically adjust the blur effect

  // Using react-spring to animate the blur effect
  const blurStyle = useSpring({
    filter: `blur(${blurAmount}px)`, // Apply the blur dynamically based on scroll position
    from: { filter: "blur(0px)" }, // Start with no blur effect
    config: { tension: 200, friction: 20 }, // Adjust spring animation speed for smooth transitions
  });

  return (
    <div ref={gapRef} data-gap={dataGap} className={styles.scrollContainer}>
      {/* Dynamic blur effect using react-spring */}
      <animated.div
        style={blurStyle}
        className={styles.contentContainer}></animated.div>
    </div>
  );
};

export default ScrollBlur;
