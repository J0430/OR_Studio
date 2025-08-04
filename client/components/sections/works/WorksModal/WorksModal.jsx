import { useState, useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useClickOutside from "@hooks/useClickOuside";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import styles from "./WorksModal.module.scss";

const { IconButton } = dynamicImportComponents("common", ["IconButton"]);

const WorksModal = ({ selectedImage, project, onClose }) => {
  console.log("Modal opened with image:", selectedImage);

  const isDevice = useMediaQuery({ maxWidth: 768 });
  const [isClosing, setIsClosing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const imageWrapperRef = useRef(null);
  const modalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasMultipleImages = project.images?.length > 1;

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    if (project && selectedImage) {
      const index = project.images.indexOf(selectedImage);
      if (index !== -1) setCurrentImageIndex(index);
    }
  }, [project, selectedImage]);

  const handleNext = useCallback(() => {
    setSwipeDirection(1);
    setZoomed(false);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project?.images?.length]);

  const handlePrevious = useCallback(() => {
    setSwipeDirection(-1);
    setZoomed(false);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project?.images.length - 1 : prev - 1
    );
  }, [project?.images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "Escape") setIsClosing(true);
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
    if (deltaX > 50) handleNext();
    else if (deltaX < -50) handlePrevious();
  };

  const handleBackdropClick = (e) => {
    const target = e.target;
    const isImage = target.tagName === "IMG";
    const isArrow = target.closest(`.${styles.direction}`);
    const isThumbnail = target.closest(`.${styles.thumbnailWrapper}`);

    if (!isImage && !isArrow && !isThumbnail) {
      onClose();
    }
  };

  const toggleZoom = () => {
    setZoomed((prev) => !prev);
  };

  return (
    <motion.div
      className={styles.modalContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}>
      <motion.div
        className={styles.modalBackdrop}
        onClick={handleBackdropClick}
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(10px)" }}
        exit={{ backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          if (isClosing) onClose();
        }}
      />

      <motion.div
        ref={modalRef}
        className={styles.modalContent}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Modal">
          ✕
        </button>

        <motion.div
          className={styles.imageWrapper}
          ref={imageWrapperRef}
          layoutId={selectedImage}>
          {hasMultipleImages && (
            <div className={`${styles.direction} ${styles.left}`}>
              <IconButton
                direction="left"
                width={isDevice ? 1.5 : 3}
                height={isDevice ? 1.5 : 3}
                onClick={handlePrevious}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className={`${styles.imageTransitionWrapper} ${
                zoomed ? styles.zoomed : ""
              }`}
              initial={{ opacity: 0, x: swipeDirection * 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -swipeDirection * 120 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={toggleZoom}
              style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}>
              <Image
                src={project?.images[currentImageIndex]}
                alt={`Project Image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className={styles.modalImage}
                style={{ objectFit: "contain", maxHeight: "100%" }}
                quality={85}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {hasMultipleImages && (
            <div className={`${styles.direction} ${styles.right}`}>
              <IconButton
                direction="right"
                width={isDevice ? 1.5 : 3}
                height={isDevice ? 1.5 : 3}
                onClick={handleNext}
              />
            </div>
          )}
        </motion.div>

        {hasMultipleImages && (
          <div className={styles.thumbnailContainer}>
            <div className={styles.thumbnailGallery}>
              {project.images.map((img, index) => (
                <button
                  key={img || index}
                  onClick={() => {
                    setSwipeDirection(index > currentImageIndex ? 1 : -1);
                    setCurrentImageIndex(index);
                    setZoomed(false);
                  }}
                  className={`${styles.thumbnailWrapper} ${
                    index === currentImageIndex ? styles.activeThumbnail : ""
                  }`}>
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={150}
                    height={125}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default WorksModal;
// import { useState, useRef, useEffect, useCallback } from "react";
// import { useMediaQuery } from "react-responsive";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import useClickOutside from "@hooks/useClickOuside";
// import { dynamicImportComponents } from "utils/dynamicImportComponents";
// import styles from "./WorksModal.module.scss";

// const { IconButton } = dynamicImportComponents("common", ["IconButton"]);

// const WorksModal = ({ selectedImage, project, onClose }) => {
//   const isDevice = useMediaQuery({ maxWidth: 768 });
//   const [isClosing, setIsClosing] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [swipeDirection, setSwipeDirection] = useState(1);
//   const [zoomed, setZoomed] = useState(false);
//   const [isImageHovered, setIsImageHovered] = useState(false);
//   const imageWrapperRef = useRef(null);
//   const modalRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const hasMultipleImages = project.images?.length > 1;

//   useClickOutside(modalRef, onClose);

//   useEffect(() => {
//     if (project && selectedImage) {
//       const index = project.images.indexOf(selectedImage);
//       if (index !== -1) setCurrentImageIndex(index);
//     }
//   }, [project, selectedImage]);

//   const handleNext = useCallback(() => {
//     setSwipeDirection(1);
//     setZoomed(false);
//     setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
//   }, [project?.images?.length]);

//   const handlePrevious = useCallback(() => {
//     setSwipeDirection(-1);
//     setZoomed(false);
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? project?.images.length - 1 : prev - 1
//     );
//   }, [project?.images.length]);

//   const handleKeyDown = useCallback(
//     (e) => {
//       if (e.key === "ArrowRight") handleNext();
//       if (e.key === "ArrowLeft") handlePrevious();
//       if (e.key === "Escape") setIsClosing(true);
//     },
//     [handleNext, handlePrevious]
//   );

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleKeyDown]);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     touchEndX.current = e.changedTouches[0].clientX;
//     const deltaX = touchStartX.current - touchEndX.current;
//     if (deltaX > 50) handleNext();
//     else if (deltaX < -50) handlePrevious();
//   };

//   const handleBackdropClick = (e) => {
//     const target = e.target;
//     const isImage = target.tagName === "IMG";
//     const isArrow = target.closest(`.${styles.direction}`);
//     const isThumbnail = target.closest(`.${styles.thumbnailWrapper}`);

//     if (!isImage && !isArrow && !isThumbnail) {
//       onClose();
//     }
//   };

//   const toggleZoom = () => {
//     setZoomed((prev) => !prev);
//   };

//   return (
//     <motion.div
//       className={styles.modalContainer}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.8 }}>
//       <motion.div
//         className={styles.modalBackdrop}
//         onClick={handleBackdropClick}
//         initial={{ backdropFilter: "blur(0px)" }}
//         animate={{ backdropFilter: "blur(10px)" }}
//         exit={{ backdropFilter: "blur(0px)" }}
//         transition={{ duration: 0.3 }}
//         onAnimationComplete={() => {
//           if (isClosing) onClose();
//         }}
//       />

//       <motion.div
//         ref={modalRef}
//         className={styles.modalContent}
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         transition={{ duration: 0.4, ease: "easeInOut" }}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}>
//         <button
//           className={styles.closeButton}
//           onClick={onClose}
//           aria-label="Close Modal">
//           ✕
//         </button>

//         <motion.div
//           className={styles.imageWrapper}
//           ref={imageWrapperRef}
//           layoutId={selectedImage}>
//           {hasMultipleImages && (
//             <div className={`${styles.direction} ${styles.left}`}>
//               <IconButton
//                 direction="left"
//                 width={isDevice ? 1.5 : 3}
//                 height={isDevice ? 1.5 : 3}
//                 onClick={handlePrevious}
//               />
//             </div>
//           )}

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentImageIndex}
//               className={`${styles.imageTransitionWrapper} ${
//                 zoomed ? styles.zoomed : ""
//               }`}
//               initial={{ opacity: 0, x: swipeDirection * 120 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -swipeDirection * 120 }}
//               transition={{ duration: 0.5, ease: "easeInOut" }}
//               onClick={toggleZoom}
//               onMouseEnter={() => setIsImageHovered(true)}
//               onMouseLeave={() => setIsImageHovered(false)}>
//               <Image
//                 src={project?.images[currentImageIndex]}
//                 alt={`Project Image ${currentImageIndex + 1}`}
//                 width={1200}
//                 height={800}
//                 className={styles.modalImage}
//                 style={{ objectFit: "contain", maxHeight: "100%" }}
//                 quality={85}
//                 priority
//               />

//               {isImageHovered && (
//                 <motion.div
//                   className={styles.zoomCursor}
//                   drag
//                   dragMomentum={false}
//                   dragElastic={0.2}
//                   dragConstraints={imageWrapperRef} // ✅ this is the key
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.3 }}>
//                   <IconButton
//                     direction={zoomed ? "zoomOut" : "zoomIn"}
//                     width={2.8}
//                     height={2.8}
//                     onClick={toggleZoom}
//                   />
//                 </motion.div>
//               )}
//             </motion.div>
//           </AnimatePresence>

//           {hasMultipleImages && (
//             <div className={`${styles.direction} ${styles.right}`}>
//               <IconButton
//                 direction="right"
//                 width={isDevice ? 1.5 : 3}
//                 height={isDevice ? 1.5 : 3}
//                 onClick={handleNext}
//               />
//             </div>
//           )}
//         </motion.div>

//         {hasMultipleImages && (
//           <div className={styles.thumbnailContainer}>
//             <div className={styles.thumbnailGallery}>
//               {project.images.map((img, index) => (
//                 <button
//                   key={img || index}
//                   onClick={() => {
//                     setSwipeDirection(index > currentImageIndex ? 1 : -1);
//                     setCurrentImageIndex(index);
//                     setZoomed(false);
//                   }}
//                   className={`${styles.thumbnailWrapper} ${
//                     index === currentImageIndex ? styles.activeThumbnail : ""
//                   }`}>
//                   <Image
//                     src={img}
//                     alt={`Thumbnail ${index + 1}`}
//                     width={150}
//                     height={125}
//                     className={styles.thumbnailImage}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default WorksModal;
