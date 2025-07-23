// components/sections/works/WorksGrid/WorksGrid.types.ts

export interface WorkImage {
  src: string;
}

export interface Work {
  title: string;
  images: WorkImage[];
  description?: string;
}

export interface WorksGridProps {
  works: Work[];
  onImageClick: (work: Work) => void;
  delay?: number;
}
