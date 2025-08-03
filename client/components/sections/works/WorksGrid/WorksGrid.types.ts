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
}

export interface Work {
  title: string;
  images: { src: string }[];
  description?: string;
}

export interface WorksGridProps {
  works: Work[];
  onImageClick: (work: Work) => void;
  delay?: number;
}
