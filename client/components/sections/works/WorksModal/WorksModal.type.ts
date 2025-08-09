export type WorksModalProps = {
  layoutId: string;
  selectedImage: string;
  images: Array<string | { src: string }>;
  onClose: () => void;
  firstOpen?: boolean;
};

export interface WorkImage {
  src: string;
  orientation?: string;
  width?: number;
  height?: number;
}
