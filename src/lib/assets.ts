/**
 * All imagery/video currently lives in the existing WordPress media library.
 * To self-host: run `npm run assets:download` (copies every referenced file into
 * /public/images) and set NEXT_PUBLIC_ASSET_BASE=/images in `.env.local`.
 */
export const ASSET_BASE =
  process.env.NEXT_PUBLIC_ASSET_BASE ?? "https://visualstudiosplus.com/wp-content/uploads/2024/09";

export const asset = (file: string) => `${ASSET_BASE}/${file}`;

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
