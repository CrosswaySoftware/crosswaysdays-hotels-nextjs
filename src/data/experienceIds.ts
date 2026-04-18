import { diningBlocks } from "./diningMedia";

export const experienceIds = diningBlocks.map((b) => b.id) as readonly string[];

export type ExperienceId = (typeof diningBlocks)[number]["id"];

export function isExperienceId(slug: string): slug is ExperienceId {
  return diningBlocks.some((b) => b.id === slug);
}
