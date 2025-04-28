export interface Work {
  title: string;
  images: { src: string }[];
}

export interface WorksGridItemProps {
  work: Work;
  index: number;
  onImageClick: (work: Work) => void;
  showImages: boolean;
}

export interface WorksGridProps {
  works: Work[];
  onImageClick: (work: Work) => void;
  delay?: number;
}
