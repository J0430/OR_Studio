// client/utils/imageId.ts
import type { ImageItem } from "./image";
import { getSrc } from "./image";

/** Build a stable layoutId for shared-layout animations. */
export function imageLayoutId(
  img: ImageItem | undefined,
  scope?: string
): string {
  const src = getSrc(img);
  return scope ? `${scope}::${src}` : src;
}
