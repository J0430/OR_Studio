// import { useState, useRef, useEffect, useCallback } from "react";
// import { useMediaQuery } from "react-responsive";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import useClickOutside from "@hooks/useClickOuside";
// import { dynamicImportComponents } from "utils/dynamicImportComponents";
// import styles from "./WorksModal.module.scss";

// const { IconButton } = dynamicImportComponents("common", ["IconButton"]);

// const WorksModal = ({ selectedImage, project, onClose }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [swipeDirection, setSwipeDirection] = useState(1);
//   const [zoomed, setZoomed] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);

//   const modalRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);
//   const isMobile = useMediaQuery({ maxWidth: 768 });

//   const hasMultipleImages = project.images.length > 1;

//   // 📌 Click outside
//   useClickOutside(modalRef, () => {
//     if (!isClosing) triggerClose();
//   });

//   // 📌 Sync selectedImage with current index
//   useEffect(() => {
//     if (project && selectedImage) {
//       const index = project.images.findIndex(
//         (img) => img.src === selectedImage
//       );
//       if (index !== -1) setCurrentImageIndex(index);
//     }
//   }, [project, selectedImage]);

//   // 📌 Escape and arrow key controls

//   // 📌 Close modal
//   const triggerClose = () => {
//     setIsClosing(true); // Allow exit animation to complete
//   };

//   const handleAnimationComplete = () => {
//     if (isClosing) onClose();
//   };

//   // 📌 Swipe logic
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     touchEndX.current = e.changedTouches[0].clientX;
//     const deltaX = touchStartX.current - touchEndX.current;

//     if (deltaX > 50) {
//       setSwipeDirection(1);
//       handleNext();
//     } else if (deltaX < -50) {
//       setSwipeDirection(-1);
//       handlePrevious();
//     }
//   };

//   const handlePrevious = () => {
//     setSwipeDirection(-1);
//     setZoomed(false);
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? project.images.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setSwipeDirection(1);
//     setZoomed(false);
//     setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
//   };
//   const handleKeyDown = useCallback(
//     (e) => {
//       if (e.key === "Escape") triggerClose();
//       if (e.key === "ArrowRight") handleNext();
//       if (e.key === "ArrowLeft") handlePrevious();
//     },
//     [handleNext, handlePrevious]
//   );
//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleKeyDown]);
//   const handleBackdropClick = (e) => {
//     const isArrow = e.target.closest(`.${styles.direction}`);
//     const isThumb = e.target.closest(`.${styles.thumbnailWrapper}`);
//     if (!isArrow && !isThumb) triggerClose();
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {!isClosing && (
//         <motion.div
//           className={styles.modalContainer}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onAnimationComplete={handleAnimationComplete}>
//           <motion.div
//             className={styles.modalBackdrop}
//             onClick={handleBackdropClick}
//             initial={{ backdropFilter: "blur(0px)" }}
//             animate={{ backdropFilter: "blur(10px)" }}
//             exit={{ backdropFilter: "blur(0px)" }}
//             transition={{ duration: 0.3 }}
//           />

//           <motion.div
//             ref={modalRef}
//             className={styles.modalContent}
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ duration: 0.4, ease: "easeInOut" }}
//             onTouchStart={handleTouchStart}
//             onTouchEnd={handleTouchEnd}>
//             <button
//               className={styles.closeButton}
//               onClick={triggerClose}
//               aria-label="Close Modal">
//               ✕
//             </button>

//             <motion.div
//               className={styles.imageWrapper}
//               layoutId={selectedImage}>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentImageIndex}
//                   className={`${styles.imageTransitionWrapper} ${
//                     zoomed ? styles.zoomed : ""
//                   }`}
//                   initial={{ opacity: 0, x: swipeDirection * 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -swipeDirection * 100 }}
//                   transition={{ duration: 0.4, ease: "easeInOut" }}
//                   onClick={() => setZoomed((z) => !z)}>
//                   <Image
//                     src={selectedImage}
//                     alt={`Project Image ${currentImageIndex + 1}`}
//                     width={1200}
//                     height={800}
//                     className={styles.modalImage}
//                     style={{ objectFit: "contain", maxHeight: "100%" }}
//                     quality={85}
//                     priority
//                   />
//                 </motion.div>
//               </AnimatePresence>

//               {hasMultipleImages && (
//                 <>
//                   <div className={`${styles.direction} ${styles.left}`}>
//                     <IconButton
//                       direction="left"
//                       width={isMobile ? 1.5 : 3}
//                       height={isMobile ? 1.5 : 3}
//                       onClick={handlePrevious}
//                     />
//                   </div>
//                   <div className={`${styles.direction} ${styles.right}`}>
//                     <IconButton
//                       direction="right"
//                       width={isMobile ? 1.5 : 3}
//                       height={isMobile ? 1.5 : 3}
//                       onClick={handleNext}
//                     />
//                   </div>
//                 </>
//               )}
//             </motion.div>

//             {hasMultipleImages && (
//               <div className={styles.thumbnailContainer}>
//                 <div className={styles.thumbnailGallery}>
//                   {project.images.map((img, index) => (
//                     <button
//                       key={img.src}
//                       className={`${styles.thumbnailWrapper} ${
//                         index === currentImageIndex
//                           ? styles.activeThumbnail
//                           : ""
//                       }`}
//                       onClick={() => {
//                         setSwipeDirection(index > currentImageIndex ? 1 : -1);
//                         setCurrentImageIndex(index);
//                         setZoomed(false);
//                       }}>
//                       <Image
//                         src={img.src}
//                         alt={`Thumbnail ${index + 1}`}
//                         width={150}
//                         height={125}
//                         className={styles.thumbnailImage}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default WorksModal;
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useClickOutside from "@hooks/useClickOuside";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import styles from "./WorksModal.module.scss";

const { IconButton } = dynamicImportComponents("common", ["IconButton"]);

const WorksModal = ({ selectedImage, project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(1);

  const modalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasMultipleImages = project.images.length > 1;

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    if (project && selectedImage) {
      const index = project.images.indexOf(selectedImage);
      if (index !== -1) setCurrentImageIndex(index);
    }
  }, [project, selectedImage]);

  const handleNext = useCallback(() => {
    setSwipeDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  const handlePrevious = useCallback(() => {
    setSwipeDirection(-1);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    },
    [handleNext, handlePrevious]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      setSwipeDirection(1);
      handleNext();
    } else if (deltaX < -50) {
      setSwipeDirection(-1);
      handlePrevious();
    }
  };
  const handleBackdropClick = useCallback(
    (e) => {
      console.log("Backdrop clicked", e.target);
      if (
        e.target.classList.contains(
          styles.modalBackdrop && styles.modalBackdrop
        )
      ) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);

        onClose();
      }
    },
    [onClose]
  );

  return (
    <motion.div
      className={styles.modalContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {" "}
      <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={styles.rippleEffect}
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </div>
      <motion.div
        ref={modalRef}
        className={styles.modalContent}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Modal">
          ✕
        </button>
        <motion.div className={styles.imageWrapper} layoutId={selectedImage}>
          {hasMultipleImages && (
            <IconButton
              direction="left"
              width={3}
              height={3}
              onClick={handlePrevious}
              className={styles.leftButton}
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: swipeDirection * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -swipeDirection * 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}>
              <Image
                src={project.images[currentImageIndex]}
                alt={`Project Image ${currentImageIndex + 1}`}
                className={styles.modalImage}
                width={1800}
                height={1100}
                style={{ objectFit: "cover" }}
                quality={85}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {hasMultipleImages && (
            <IconButton
              direction="right"
              width={3}
              height={3}
              onClick={handleNext}
              className={styles.rightButton}
            />
          )}
        </motion.div>{" "}
        {hasMultipleImages && (
          <div
            className={styles.thumbnailGallery}
            role="navigation"
            aria-label="Image Thumbnails">
            {project.images.map((img, index) => (
              <button
                key={img || index}
                onClick={() => setCurrentImageIndex(index)}
                className={`${styles.thumbnailWrapper} ${
                  index === currentImageIndex ? styles.activeThumbnail : ""
                }`}
                aria-label={`Go to image ${index + 1}`}>
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={75}
                  className={styles.thumbnailImage}
                />
              </button>
            ))}
          </div>
        )}{" "}
      </motion.div>
    </motion.div>
  );
};

export default WorksModal;
