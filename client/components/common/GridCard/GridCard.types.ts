// export type ImageItem = string | { src: string };

// export type Work = {
//   id?: string;
//   slug?: string;
//   images: ImageItem[];
//   // allow extra fields without complaining
//   [key: string]: any;
// };

// export type GridCardOpenPayload = {
//   layoutId: string;
//   img: string;
//   work: Work;
//   /** true only the very first time a modal is opened after page load */
//   firstOpen?: boolean;
// };

// export type GridCardProps = {
//   img: string;
//   work: Work;
//   onOpen: (payload: GridCardOpenPayload) => void;
//   /** WorksGrid will pass this; defaults to false */
//   firstOpen?: boolean;
// };
// components/common/GridCard/MediaCard.types.ts
export interface GridCardProps {
  imageSrc: string;
  title?: string;
  description?: string;
  index?: number;
  layoutId?: string;
  onClick: (work: any) => void;
  aspectRatio?: number;
  className?: string;
  selectedImage?: string;
  work?: Work;
  img: string;
  onOpen: (layoutId: string, img: any, project: any) => void;
}
export interface WorkImage {
  src: string;
  orientation?: string;
  width?: number;
  height?: number;
}

export interface Work {
  title: string;
  description?: string;
  images: WorkImage[];
  id?: string;

  // add other fields like storyline, views if needed
}

export interface WorksGridProps {
  works: Work[];
  onImageClick: (work: Work) => void;
  delay?: number;
  selectedTab?: string;
  categorySelected?: string;
  selectedImage?: string;
}
