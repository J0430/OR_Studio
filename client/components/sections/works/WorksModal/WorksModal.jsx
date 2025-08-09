// import { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import useClickOutside from "@hooks/useClickOuside";
// import { dynamicImportComponents } from "utils/dynamicImportComponents";
// import styles from "./WorksModal.module.scss";

// const { IconButton } = dynamicImportComponents("common", ["IconButton"]);

// // ---- Local types (keeps this file self-contained) ----
// type Ripple = { x: number; y: number; id: number };
// type WorksModalProps = {
//   layoutId: string; // MUST match GridCard layoutId for shared transition
//   selectedImage: string; // src of the image that was clicked
//   work: { images: Array<string | { src?: string }>; [k: string]: any };
//   onClose: () => void;
//   firstOpen?: boolean; // optional: if parent wants to force initial lock
// };

// export default function WorksModal({
//   layoutId,
//   selectedImage,
//   work,
//   onClose,
//   firstOpen = true,
// }: WorksModalProps) {
//   // Normalize images -> string[]
//   const images = useMemo(
//     () =>
//       (work?.images ?? [])
//         .map((img) => (typeof img === "string" ? img : img?.src || ""))
//         .filter(Boolean),
//     [work]
//   );

//   // Find initial index from the clicked card
//   const initialIndex = useMemo(() => {
//     const idx = images.findIndex((src) => src === selectedImage);
//     return idx >= 0 ? idx : 0;
//   }, [images, selectedImage]);

//   const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

//   // Lock nav & slide animation until the shared-layout finishes its first transition
//   const [isSettled, setIsSettled] = useState(false);
//   const [hasInteracted, setHasInteracted] = useState(false); // becomes true after first nav/tap/thumbnail

//   // Visual goodies
//   const [ripples, setRipples] = useState<Ripple[]>([]);
//   const [swipeDirection, setSwipeDirection] = useState(1);

//   const modalRef = useRef<HTMLDivElement | null>(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const hasMultipleImages = images.length > 1;

//   // Close when clicking outside the white box
//   useClickOutside(modalRef, onClose);

//   // Keep current index in sync if selectedImage changes
//   useEffect(() => {
//     setCurrentImageIndex(initialIndex);
//   }, [initialIndex]);

//   // ESC closes, arrows navigate ONLY once settled
//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent) => {
//       if (e.key === "Escape") return onClose();
//       if (!isSettled) return; // block nav until the first layout animation completes
//       if (e.key === "ArrowRight") handleNext();
//       if (e.key === "ArrowLeft") handlePrevious();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [isSettled] // intentionally not including handleNext/Prev to keep stable
//   );

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleKeyDown]);

//   const navLocked = firstOpen ? !isSettled : !isSettled; // future: could vary, keeping simple

//   const handleNext = useCallback(() => {
//     if (navLocked) return;
//     setHasInteracted(true);
//     setSwipeDirection(1);
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   }, [images.length, navLocked]);

//   const handlePrevious = useCallback(() => {
//     if (navLocked) return;
//     setHasInteracted(true);
//     setSwipeDirection(-1);
//     setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   }, [images.length, navLocked]);

//   // Touch swipe
//   const handleTouchStart = (e) => {
//     if (navLocked) return;
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     if (navLocked) return;
//     touchEndX.current = e.changedTouches[0].clientX;
//     const deltaX = touchStartX.current - touchEndX.current;
//     if (deltaX > 50) handleNext();
//     else if (deltaX < -50) handlePrevious();
//   };

//   // Backdrop click closes (with ripple)
//   const handleBackdropClick = useCallback(
//     (e: React.MouseEvent<HTMLDivElement>) => {
//       const target = e.target as HTMLElement;
//       if (target.classList.contains(styles.modalBackdrop)) {
//         const rect = target.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         const id = Date.now();

//         setRipples((prev) => [...prev, { x, y, id }]);
//         setTimeout(() => {
//           setRipples((prev) => prev.filter((r) => r.id !== id));
//         }, 600);

//         onClose();
//       }
//     },
//     [onClose]
//   );

//   // Decide how the active image transitions:
//   //  - On initial open (before settled): no slide, let shared-layout do its thing.
//   //  - After settled and after user interacts: slide between images.
//   const shouldSlide = isSettled && hasInteracted;

//   return (
//     <motion.div
//       className={styles.modalContainer}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}>
//       {/* Backdrop */}
//       <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
//         {ripples.map((r) => (
//           <span
//             key={r.id}
//             className={styles.rippleEffect}
//             style={{ left: r.x, top: r.y }}
//           />
//         ))}
//       </div>

//       {/* Close */}
//       <button
//         className={styles.closeButton}
//         onClick={onClose}
//         aria-label="Close">
//         ✕
//       </button>

//       {/* Content */}
//       <motion.div
//         ref={modalRef}
//         className={styles.modalContent}
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.95 }}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}>
//         {/* This is the shared element. MUST match GridCard layoutId */}
//         <motion.div
//           className={styles.imageWrapper}
//           layoutId={layoutId}
//           // When the shared-layout finishes the open transition, unlock nav.
//           onLayoutAnimationComplete={() => setIsSettled(true)}>
//           {hasMultipleImages && (
//             <IconButton
//               direction="left"
//               width={3}
//               height={3}
//               onClick={handlePrevious}
//               className={styles.leftButton}
//               aria-disabled={navLocked}
//             />
//           )}

//           <AnimatePresence mode="wait" initial={false}>
//             <motion.div
//               key={currentImageIndex}
//               initial={
//                 shouldSlide
//                   ? { opacity: 0, x: swipeDirection * 100 }
//                   : { opacity: 1, x: 0 } // no slide on the very first paint
//               }
//               animate={{ opacity: 1, x: 0 }}
//               exit={
//                 shouldSlide
//                   ? { opacity: 0, x: -swipeDirection * 100 }
//                   : { opacity: 1, x: 0 }
//               }
//               transition={{ duration: 0.35, ease: "easeInOut" }}>
//               <Image
//                 src={images[currentImageIndex]}
//                 alt={`work Image ${currentImageIndex + 1}`}
//                 className={styles.modalImage}
//                 width={1800}
//                 height={1100}
//                 style={{ objectFit: "cover" }}
//                 quality={85}
//                 priority
//               />
//             </motion.div>
//           </AnimatePresence>

//           {hasMultipleImages && (
//             <IconButton
//               direction="right"
//               width={3}
//               height={3}
//               onClick={handleNext}
//               className={styles.rightButton}
//               aria-disabled={navLocked}
//             />
//           )}
//         </motion.div>

//         {/* Thumbs */}
//         {hasMultipleImages && (
//           <div
//             className={styles.thumbnailGallery}
//             role="navigation"
//             aria-label="Image Thumbnails">
//             {images.map((img, index) => (
//               <button
//                 key={img || index}
//                 onClick={() => {
//                   if (navLocked) return;
//                   setHasInteracted(true);
//                   setCurrentImageIndex(index);
//                 }}
//                 className={`${styles.thumbnailWrapper} ${
//                   index === currentImageIndex ? styles.activeThumbnail : ""
//                 }`}
//                 aria-label={`Go to image ${index + 1}`}>
//                 <Image
//                   src={img}
//                   alt={`Thumbnail ${index + 1}`}
//                   width={100}
//                   height={75}
//                   className={styles.thumbnailImage}
//                 />
//               </button>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }

// components/sections/works/WorksGrid/WorksGrid.tsx
// client/components/sections/works/WorksModal/WorksModal.tsx
// import { useState, useRef, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import styles from "./WorksModal.module.scss"; // 👈 make sure this line exists

// // If you use IconButton replace the import below with your dynamic import
// import { dynamicImportComponents } from "utils/dynamicImportComponents";
// const { IconButton } = dynamicImportComponents("common", ["IconButton"]);

// // ---- Types that match your JSON ----
// type Orientation = "landscape" | "portrait" | "square";
// export type ImageItem = {
//   src: string;
//   width?: number;
//   height?: number;
//   orientation?: Orientation;
// };
// export type Work = {
//   id?: string;
//   slug?: string;
//   images: Array<string | ImageItem>;
// };

// // Helpers
// const getSrc = (img?: string | ImageItem) =>
//   typeof img === "string" ? img : (img?.src ?? "");

// const toImageItem = (img?: string | ImageItem): ImageItem | undefined =>
//   img ? (typeof img === "string" ? { src: img } : img) : undefined;

// // ---- Props ----
// type WorksModalProps = {
//   layoutId?: string; // use the same value as the grid card layoutId (we use image src)
//   selectedImage: string;
//   project: Work;
//   onClose: () => void;
//   firstOpen?: boolean;
// };

// export default function WorksModal({
//   layoutId,
//   selectedImage,
//   project,
//   onClose,
// }: WorksModalProps) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [swipeDirection, setSwipeDirection] = useState<1 | -1>(1);
//   const [ripples, setRipples] = useState<
//     Array<{ x: number; y: number; id: number }>
//   >([]);

//   const modalRef = useRef<HTMLDivElement | null>(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const images = project?.images ?? [];
//   const total = images.length;
//   const hasMultipleImages = total > 1;

//   // Initialize index from selectedImage (works for string or object arrays)
//   useEffect(() => {
//     if (!selectedImage || !total) return;
//     const idx = images.findIndex((it) => getSrc(it) === selectedImage);
//     setCurrentImageIndex(idx >= 0 ? idx : 0);
//   }, [selectedImage, total, images]);

//   // Keyboard arrows
//   const handleNext = useCallback(() => {
//     if (!total) return;
//     setSwipeDirection(1);
//     setCurrentImageIndex((p) => (p + 1) % total);
//   }, [total]);

//   const handlePrevious = useCallback(() => {
//     if (!total) return;
//     setSwipeDirection(-1);
//     setCurrentImageIndex((p) => (p === 0 ? total - 1 : p - 1));
//   }, [total]);

//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") handleNext();
//       if (e.key === "ArrowLeft") handlePrevious();
//       if (e.key === "Escape") onClose();
//     },
//     [handleNext, handlePrevious, onClose]
//   );

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleKeyDown]);

//   // Touch
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = (e) => {
//     touchEndX.current = e.changedTouches[0].clientX;
//     const deltaX = touchStartX.current - touchEndX.current;
//     if (deltaX > 50) handleNext();
//     else if (deltaX < -50) handlePrevious();
//   };

//   // Backdrop click + ripple
//   const handleBackdropClick = useCallback(
//     (e: React.MouseEvent<HTMLDivElement>) => {
//       const el = e.target as HTMLElement;
//       if (!el.classList.contains(styles.modalBackdrop)) return;

//       const rect = el.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       const id = Date.now();

//       setRipples((prev) => [...prev, { x, y, id }]);
//       setTimeout(() => {
//         setRipples((prev) => prev.filter((r) => r.id !== id));
//       }, 600);

//       onClose();
//     },
//     [onClose]
//   );

//   const current = toImageItem(images[currentImageIndex]);
//   const currentSrc = getSrc(current);

//   return (
//     <motion.div
//       className={styles.modalContainer}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}>
//       <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
//         {ripples.map((r) => (
//           <span
//             key={r.id}
//             className={styles.rippleEffect}
//             style={{ left: r.x, top: r.y }}
//           />
//         ))}
//       </div>

//       <button
//         className={styles.closeButton}
//         onClick={onClose}
//         aria-label="Close Modal">
//         ✕
//       </button>

//       <motion.div
//         ref={modalRef}
//         className={styles.modalContent}
//         initial={{ scale: 0.96 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.96 }}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}>
//         <motion.div
//           className={styles.imageWrapper}
//           layoutId={layoutId || selectedImage /* shared-element id */}>
//           {hasMultipleImages && (
//             <IconButton
//               direction="left"
//               width={3}
//               height={3}
//               onClick={handlePrevious}
//               className={styles.leftButton}
//             />
//           )}

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentSrc || currentImageIndex}
//               initial={{ opacity: 0, x: swipeDirection * 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -swipeDirection * 100 }}
//               transition={{ duration: 0.35, ease: "easeInOut" }}>
//               {currentSrc && (
//                 <Image
//                   src={currentSrc}
//                   alt={`Project image ${currentImageIndex + 1}`}
//                   className={styles.modalImage}
//                   width={current?.width || 1600}
//                   height={current?.height || 1000}
//                   style={{ objectFit: "cover" }}
//                   quality={85}
//                   priority
//                 />
//               )}
//             </motion.div>
//           </AnimatePresence>

//           {hasMultipleImages && (
//             <IconButton
//               direction="right"
//               width={3}
//               height={3}
//               onClick={handleNext}
//               className={styles.rightButton}
//             />
//           )}
//         </motion.div>

//         {hasMultipleImages && (
//           <div
//             className={styles.thumbnailGallery}
//             role="navigation"
//             aria-label="Image Thumbnails">
//             {images.map((img, index) => {
//               const ii = toImageItem(img);
//               const src = getSrc(ii);
//               return (
//                 <button
//                   key={src || index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`${styles.thumbnailWrapper} ${
//                     index === currentImageIndex ? styles.activeThumbnail : ""
//                   }`}
//                   aria-label={`Go to image ${index + 1}`}>
//                   {src && (
//                     <Image
//                       src={src}
//                       alt={`Thumbnail ${index + 1}`}
//                       width={100}
//                       height={75}
//                       className={styles.thumbnailImage}
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }
//WorksModal.jsx

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useClickOutside from "@hooks/useClickOuside";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import styles from "./WorksModal.module.scss";

const { IconButton } = dynamicImportComponents("common", ["IconButton"]);

const WorksModal = ({ selectedImage, project, onClose, firstOpen = true }) => {
  console.log(project?.images[0]?.src, "modalProject.images[0].src");
  console.log(selectedImage, "modalSelectedImage");
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [ripples, setRipples] = useState([]);
  // const [swipeDirection, setSwipeDirection] = useState(1);
  // const modalRef = useRef(null);
  // const touchStartX = useRef(0);
  // const touchEndX = useRef(0);
  // const hasMultipleImages = project.images.length > 1;
  // useClickOutside(modalRef, onClose);
  // useEffect(() => {
  //   if (project && selectedImage) {
  //     const index = project.images.indexOf(selectedImage);
  //     if (index !== -1) setCurrentImageIndex(index);
  //   }
  // }, [project, selectedImage]);
  // const handleNext = useCallback(() => {
  //   setSwipeDirection(1);
  //   setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  // }, [project.images.length]);
  // const handlePrevious = useCallback(() => {
  //   setSwipeDirection(-1);
  //   setCurrentImageIndex((prev) =>
  //     prev === 0 ? project.images.length - 1 : prev - 1
  //   );
  // }, [project.images.length]);
  // const handleKeyDown = useCallback(
  //   (e) => {
  //     if (e.key === "ArrowRight") handleNext();
  //     if (e.key === "ArrowLeft") handlePrevious();
  //   },
  //   [handleNext, handlePrevious]
  // );
  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [handleKeyDown]);
  // const handleTouchStart = (e) => {
  //   touchStartX.current = e.touches[0].clientX;
  // };
  // const handleTouchEnd = (e) => {
  //   touchEndX.current = e.changedTouches[0].clientX;
  //   const deltaX = touchStartX.current - touchEndX.current;
  //   if (deltaX > 50) {
  //     setSwipeDirection(1);
  //     handleNext();
  //   } else if (deltaX < -50) {
  //     setSwipeDirection(-1);
  //     handlePrevious();
  //   }

  // const handleBackdropClick = useCallback(
  //   (e) => {
  //     console.log("Backdrop clicked", e.target);
  //     if (
  //       e.target.classList.contains(
  //         styles.modalBackdrop && styles.modalBackdrop
  //       )
  //     ) {
  //       const rect = e.target.getBoundingClientRect();
  //       const x = e.clientX - rect.left;
  //       const y = e.clientY - rect.top;
  //       const id = Date.now();

  //       setRipples((prev) => [...prev, { x, y, id }]);
  //       setTimeout(() => {
  //         setRipples((prev) => prev.filter((r) => r.id !== id));
  //       }, 600);

  //       onClose();
  //     }
  //   },
  //   [onClose]
  // );
  // const images = useMemo(
  //   () =>
  //     (project?.images ?? [])
  //       .map((img) => (typeof img === "string" ? img : img?.src || ""))
  //       .filter(Boolean),
  //   [project]
  // );

  // Find initial index from the clicked card
  const initialIndex = useMemo(() => {
    const idx = project.images.findIndex((src) => src === selectedImage);
    return idx >= 0 ? idx : 0;
  }, [project.images, selectedImage]);

  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  // Lock nav & slide animation until the shared-layout finishes its first transition
  const [isSettled, setIsSettled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // becomes true after first nav/tap/thumbnail

  // Visual goodies
  const [ripples, setRipples] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(1);

  const modalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasMultipleImages = project.images.length > 1;

  // Close when clicking outside the white box
  useClickOutside(modalRef, onClose);

  // Keep current index in sync if selectedImage changes
  useEffect(() => {
    setCurrentImageIndex(initialIndex);
  }, [initialIndex]);

  // Handlers (respect lock)
  const navLocked = firstOpen ? !isSettled : !isSettled; // future: could vary, keeping simple
  const handleKeyDown = useCallback(
    (e) => {
      if (!isSettled) return; // block nav until the first layout animation completes
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSettled] // intentionally not including handleNext/Prev to keep stable
  );
  // ESC closes, arrows navigate ONLY once settled

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  const handleNext = useCallback(() => {
    if (navLocked) return;
    setHasInteracted(true);
    setSwipeDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project.images.length, navLocked]);

  const handlePrevious = useCallback(() => {
    if (navLocked) return;
    setHasInteracted(true);
    setSwipeDirection(-1);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length, navLocked]);

  // Touch swipe
  const handleTouchStart = (e) => {
    if (navLocked) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (navLocked) return;
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) handleNext();
    else if (deltaX < -50) handlePrevious();
  };

  // Backdrop click closes (with ripple)
  const handleBackdropClick = useCallback(
    (e) => {
      const target = e.target;
      if (target.classList.contains(styles.modalBackdrop)) {
        const rect = target.getBoundingClientRect();
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

  // Decide how the active image transitions:
  //  - On initial open (before settled): no slide, let shared-layout do its thing.
  //  - After settled and after user interacts: slide between project.images.
  const shouldSlide = isSettled && hasInteracted;
  return (
    <motion.div
      className={styles.modalContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {/* Backdrop */}
      <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
        {ripples.map((r) => (
          <span
            key={r.id}
            className={styles.rippleEffect}
            style={{ left: r.x, top: r.y }}
          />
        ))}
      </div>

      {/* Close */}
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close">
        ✕
      </button>

      {/* Content */}
      <motion.div
        ref={modalRef}
        className={styles.modalContent}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        {/* This is the shared element. MUST match GridCard layoutId */}
        <motion.div
          className={styles.imageWrapper}
          layoutId={project?.images[0]?.src}
          // When the shared-layout finishes the open transition, unlock nav.
          onLayoutAnimationComplete={() => setIsSettled(true)}>
          {hasMultipleImages && (
            <IconButton
              direction="left"
              width={3}
              height={3}
              onClick={handlePrevious}
              className={styles.leftButton}
              aria-disabled={navLocked}
            />
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={
                shouldSlide
                  ? { opacity: 0, x: swipeDirection * 100 }
                  : { opacity: 1, x: 0 } // no slide on the very first paint
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                shouldSlide
                  ? { opacity: 0, x: -swipeDirection * 100 }
                  : { opacity: 1, x: 0 }
              }
              transition={{ duration: 0.35, ease: "easeInOut" }}>
              <Image
                src={project?.images[currentImageIndex]?.src}
                alt={`Project Image ${currentImageIndex + 1}`}
                className={styles.modalImage}
                width={1200}
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
              aria-disabled={navLocked}
            />
          )}
        </motion.div>

        {/* Thumbs */}
        {hasMultipleImages && (
          <div
            className={styles.thumbnailGallery}
            role="navigation"
            aria-label="Image Thumbnails">
            {project.images.map(
              (img, index) => (
                console.log(img.src),
                (
                  <button
                    key={img?.src || index}
                    onClick={() => {
                      if (navLocked) return;
                      setHasInteracted(true);
                      setCurrentImageIndex(index);
                    }}
                    className={`${styles.thumbnailWrapper} ${
                      index === currentImageIndex ? styles.activeThumbnail : ""
                    }`}
                    aria-label={`Go to image ${index + 1}`}>
                    <Image
                      src={img?.src}
                      alt={`Thumbnail ${index + 1}`}
                      width={100}
                      height={75}
                      className={styles.thumbnailImage}
                    />
                  </button>
                )
              )
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
export default WorksModal;
