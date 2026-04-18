/**
 * Crossway Days Hotel gallery — same structure as Palomar (`galleryFeatured` + `galleryRest` + `galleryAll`).
 * Paths under `public/images/gallery/`.
 */
export type GalleryItem = { src: string; alt: string };

const HOTEL = "Crossway Days Hotel";

/** First row — large hero + three tiles (matches legacy grid emphasis). */
export const galleryFeatured: { hero: GalleryItem; stack: [GalleryItem, GalleryItem, GalleryItem] } = {
  hero: {
    src: "/images/gallery/days-hotel-suite-room.jpg",
    alt: `${HOTEL} — suite room`,
  },
  stack: [
    {
      src: "/images/gallery/days-hotel-nutcracker-restaurant.jpg",
      alt: `${HOTEL} — Nutcracker restaurant`,
    },
    {
      src: "/images/gallery/days-hotel-sunrise-banquet.jpg",
      alt: `${HOTEL} — Sunrise banquet hall`,
    },
    {
      src: "/images/gallery/days-hotel-ridebar.jpg",
      alt: `${HOTEL} — Ride bar`,
    },
  ],
};

const featuredSrcs = new Set([
  galleryFeatured.hero.src,
  ...galleryFeatured.stack.map((i) => i.src),
]);

const galleryRestRaw: GalleryItem[] = [
  { src: "/images/gallery/days-hotel-lobby.jpg", alt: `${HOTEL} — lobby` },
  { src: "/images/gallery/days-hotel-chennai-omr-lobby.jpg", alt: `${HOTEL} — Chennai OMR lobby` },
  { src: "/images/gallery/days-hotel-chennai-omr-lobby-lounge.jpg", alt: `${HOTEL} — lobby lounge` },
  { src: "/images/gallery/days-hotel-lobby-lounge.jpg", alt: `${HOTEL} — lounge` },
  { src: "/images/gallery/days-hotel-omr-lobby.jpg", alt: `${HOTEL} — OMR lobby` },
  { src: "/images/gallery/days-hotel-corridor.jpg", alt: `${HOTEL} — corridor` },
];

function dedupeBySrc(items: GalleryItem[]): GalleryItem[] {
  const seen = new Set<string>();
  const out: GalleryItem[] = [];
  for (const it of items) {
    if (seen.has(it.src)) continue;
    seen.add(it.src);
    out.push(it);
  }
  return out;
}

/** Remaining images after the featured row, excluding duplicates. */
export const galleryRest: GalleryItem[] = dedupeBySrc(galleryRestRaw.filter((i) => !featuredSrcs.has(i.src)));

/** Full ordered list for the slideshow (hero + stack + rest). */
export const galleryAll: GalleryItem[] = dedupeBySrc([
  galleryFeatured.hero,
  ...galleryFeatured.stack,
  ...galleryRest,
]);

/** @deprecated Use `galleryAll` — kept for any legacy imports. */
export const galleryImages = galleryAll.map((i) => i.src) as readonly string[];
