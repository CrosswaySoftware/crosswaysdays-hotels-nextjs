import { diningBlocks } from "@/data/diningMedia";

/** Dining & venue rows — order matches `diningMedia` / legacy site sections */
export const daysExperienceBlocks = diningBlocks.map((b, i) => ({
  id: b.id,
  imageFirst: b.imageFirst,
  images: b.images,
  venueNo: String(i + 1).padStart(2, "0"),
  showHours: false as boolean,
}));
