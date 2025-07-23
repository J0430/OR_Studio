// components/common/MediaCard/MediaCard.types.ts
export interface MediaCardProps {
  imageSrc: string;
  title?: string;
  description?: string;
  index?: number;
  layoutId?: string;
  onClick?: () => void;
  aspectRatio?: number;
  className?: string; // 👈 Optional prop for styling flexibility
}
