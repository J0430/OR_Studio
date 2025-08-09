//WorksGrid.types.ts;

// export interface WorkImage {
//   src: string;
//   orientation?: string;
//   width?: number;
//   height?: number;
// }

// export interface Work {
//   title: string;
//   description?: string;
//   images: WorkImage[];
//   id?: string;

//   // add other fields like storyline, views if needed
// }

// export interface WorksGridProps {
//   works: Work[];
//   onImageClick: (work: Work) => void;
//   delay?: number;
//   selectedTab?: string;
//   categorySelected?: string;
// }

// //WorksGrid.types.ts;
// export type WorksModalProject = {
//   title?: string;
//   images: Array<string | { src: string }>;
// };

// export interface WorksModalProps {
//   layoutId: string; // pass selectedImage as layoutId
//   selectedImage: string;
//   project: WorksModalProject;
//   onClose: () => void;
// }
// components/sections/works/WorksGrid/WorksGrid.types.ts

// export interface Work {
//   frontImage: string;
//   images?: string[];
//   [key: string]: any;
// }

// export interface WorksGridItemProps {
//   work: Work;
//   index: number;
//   onImageClick: (imageSrc: string) => void;
//   showImages: boolean;
// }

// export interface WorksGridProps {
//   works: Work[];
//   onImageClick: (imageSrc: string) => void;
//   delay?: number;
// }
// components/sections/works/WorksGrid/WorksGrid.types.ts

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
  onImageClick: (imageSrc: string, layoutId: string) => void;
  delay?: number;
  selectedTab?: string;
  categorySelected?: string;
  selectedImage?: string;
  hasOpened?: boolean;
}
