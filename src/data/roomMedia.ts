/** Image paths under /public — room cards, galleries, amenities from legacy site. */

export const roomMedia = {
  standard: {
    card: "/images/rooms/days-hotel-standard-room.jpg",
    gallery: [
      "/images/rooms/days-hotel-chennai-omr-standard-room.jpg",
      "/images/rooms/days-hotel-chennai-omr-standard-room-twin-bed.jpg",
    ],
  },
  deluxe: {
    card: "/images/rooms/days-hotel-deluxe-room.jpg",
    gallery: [
      "/images/rooms/days-hotel-chennai-omr-deluxe-room.jpg",
      "/images/rooms/days-hotel-deluxe-room-bed.jpg",
    ],
  },
  suite: {
    card: "/images/rooms/days-hotel-suite-room.jpg",
    gallery: [
      "/images/rooms/days-hotel-chennai-omr-suite-room.jpg",
      "/images/rooms/days-hotel-chennai-omr-room.jpg",
    ],
  },
} as const;

export type RoomId = keyof typeof roomMedia;
