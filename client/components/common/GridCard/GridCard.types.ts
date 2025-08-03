// components/common/GridCard/MediaCard.types.ts
export interface GridCardProps {
  imageSrc: string;
  title?: string;
  description?: string;
  index?: number;
  layoutId?: string;
  onClick?: () => void;
  aspectRatio?: number;
  className?: string;
}
