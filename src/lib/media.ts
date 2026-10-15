import { getImageProps } from "next/image";

/**
 * URL of an image passed through the Next.js optimizer (AVIF/WebP, resized).
 * For places that need a plain URL rather than <Image>, e.g. a <video poster>.
 */
export function optimizedSrc(src: string, width = 1920, quality = 70) {
  return getImageProps({ src, alt: "", width, height: Math.round((width * 9) / 16), quality }).props.src;
}
