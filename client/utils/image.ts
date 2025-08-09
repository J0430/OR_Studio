// client/utils/image.ts
export type Orientation = "landscape" | "portrait" | "square";

export type ImageItem = {
  src: string;
  width?: number;
  height?: number;
  orientation?: Orientation;
};

export function getSrc(img?: string | ImageItem) {
  return typeof img === "string" ? img : (img?.src ?? "");
}

// Best-effort orientation (uses explicit field first, then width/height)
export function getOrientation(img?: ImageItem): Orientation {
  if (!img) return "landscape";
  if (typeof img !== "string") {
    if (img.orientation) return img.orientation;
    if (img.width && img.height) {
      if (img.width === img.height) return "square";
      return img.width > img.height ? "landscape" : "portrait";
    }
  }
  return "landscape";
}

// Stable cover image for a project
export function getCoverSrc(images: ImageItem[] | undefined): string {
  return images && images.length ? getSrc(images[0]) : "";
}
