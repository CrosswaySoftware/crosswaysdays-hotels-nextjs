"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DisplayHeading } from "@/design-system/components/DisplayHeading";
import { Eyebrow } from "@/design-system/components/Eyebrow";
import { daysExperienceBlocks } from "@/data/daysExperienceBlocks";
import type { ExperienceId } from "@/data/experienceIds";
import { roomMedia } from "@/data/roomMedia";
import { CROSSWAY_HOME } from "@/lib/crosswayHotelHomeNav";
import { imageBlurPlaceholder } from "@/lib/imagePlaceholder";
import { RESAVENUE_BOOK_DIRECT_URL } from "@/lib/resavenueBooking";
import styles from "./DaysV2Sections.module.scss";

const ROOM_KEYS = ["standard", "deluxe", "suite"] as const;

const ROOM_IMG: (readonly string[])[] = [
  [roomMedia.standard.card, ...roomMedia.standard.gallery],
  [roomMedia.deluxe.card, ...roomMedia.deluxe.gallery],
  [roomMedia.suite.card, ...roomMedia.suite.gallery],
];

function pickThreeImages(urls: readonly string[]): [string, string, string] {
  const out = [...urls];
  while (out.length < 3) {
    out.push(out[out.length - 1] ?? "");
  }
  return [out[0]!, out[1]!, out[2]!];
}

function padRoomThumbs(imgs: readonly string[]): [string, string] {
  const a = imgs[1];
  const b = imgs[2];
  const main = imgs[0];
  return [a ?? main, b ?? a ?? main];
}

const GALLERY_TILES = [
  { src: "/images/gallery/days-hotel-suite-room.jpg", tag: "Suite", w: 2 as const, h: 2 as const },
  { src: "/images/rooms/days-hotel-standard-room.jpg", tag: "Rooms", w: 1, h: 1 },
  { src: "/images/banquet/sunrise1/days-hotel-sunrise-banquet.jpg", tag: "Banquet", w: 1, h: 1 },
  { src: "/images/dayshotel.jpg", tag: "Hotel", w: 2, h: 1 },
  { src: "/images/restaurant/days-hotel-nutcracker-restaurant.jpg", tag: "Dining", w: 1, h: 1 },
  { src: "/images/spa/days-hotel-viviana-spa.jpg", tag: "Spa", w: 1, h: 1 },
  { src: "/images/gallery/days-hotel-lobby.jpg", tag: "Lobby", w: 1, h: 1 },
];

export function DaysV2StorySection() {
  const t = useTranslations("DaysHome");
  const v = useTranslations("DaysV2.story");

  return (
    <section className={`${styles.ds} ${styles.section}`} id={CROSSWAY_HOME.story}>
      <div className={styles.storyGrid}>
        <div className={styles.storyFigure}>
          <div className={styles.storyImg}>
            <Image
              {...imageBlurPlaceholder}
              src="/images/dayshotel.jpg"
              alt=""
              fill
              sizes="(max-width: 880px) 100vw, 45vw"
              className={styles.storyPhoto}
              quality={88}
              priority
            />
          </div>
          <div className={styles.storyCap}>
            <span>{v("caption")}</span>
          </div>
        </div>
        <div className={styles.storyCol}>
          <div className={styles.storyMeta}>
            <Eyebrow>{v("eyebrow")}</Eyebrow>
            <div className={styles.stamp}>{v("stamp")}</div>
          </div>
          <DisplayHeading as="h2" className={styles.displayTight}>
            {t("overview.title")}
          </DisplayHeading>
          <div className={styles.storyBody}>
            <p>{t("overview.p1")}</p>
            <p>{t("overview.p2")}</p>
            <Link href={`/#${CROSSWAY_HOME.accommodation}`} className={styles.linkArrow}>
              {v("linkRooms")} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DaysV2RoomsBoard({ sectionId }: { sectionId?: string }) {
  const t = useTranslations("DaysHome");
  const v = useTranslations("DaysV2.rooms");
  return (
    <section className={`${styles.ds} ${styles.section}`} {...(sectionId ? { id: sectionId } : {})}>
      <div className={styles.roomsHead}>
        <Eyebrow>{v("eyebrow")}</Eyebrow>
        <DisplayHeading as="h2" className={styles.displayTight}>
          {v("title")}
        </DisplayHeading>
        <p className={styles.intro}>{t("rooms.intro")}</p>
      </div>
      <div className={styles.acc}>
        {ROOM_KEYS.map((key, i) => {
          const imgs = ROOM_IMG[i] ?? ROOM_IMG[0];
          const main = imgs[0];
          const [thumbA, thumbB] = padRoomThumbs(imgs);
          const title = t(`rooms.${key}.title`);
          return (
            <div key={key} className={`${styles.accRow} ${i % 2 ? styles.accRowRev : ""}`}>
              <div className={styles.accGallery}>
                <div className={styles.accMain}>
                  <Image
                    {...imageBlurPlaceholder}
                    src={main}
                    alt=""
                    fill
                    sizes="(max-width: 1000px) 100vw, 42vw"
                    className={styles.accMainImg}
                    quality={86}
                    priority={i === 0}
                  />
                </div>
                <div className={styles.accThumbs}>
                  <div className={styles.accThumb}>
                    <Image
                      {...imageBlurPlaceholder}
                      src={thumbA}
                      alt=""
                      fill
                      sizes="(max-width: 1000px) 45vw, 18vw"
                      className={styles.accThumbImg}
                      quality={80}
                    />
                  </div>
                  <div className={styles.accThumb}>
                    <Image
                      {...imageBlurPlaceholder}
                      src={thumbB}
                      alt=""
                      fill
                      sizes="(max-width: 1000px) 45vw, 18vw"
                      className={styles.accThumbImg}
                      quality={80}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.accMeta}>
                <p className={styles.accBeds}>{v(`beds.${key}`)}</p>
                <DisplayHeading as="h2" className={styles.displayTight}>
                  {title}
                </DisplayHeading>
                <p className={styles.accTag}>{v(`tagline.${key}`)}</p>
                <p className={styles.accDesc}>{t(`rooms.${key}.description`)}</p>
                <ul className={styles.accFeatures}>
                  {(t.raw(`rooms.v2Features.${key}`) as string[]).map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
                <div className={styles.accFoot}>
                  <div className={styles.accIdeal}>
                    <span className={styles.accIdealLabel}>{v("idealFor")}</span>
                    <p className={styles.accIdealText}>{v(`idealDetail.${key}`)}</p>
                  </div>
                  <a href={RESAVENUE_BOOK_DIRECT_URL} className={styles.accCta} target="_blank" rel="noopener noreferrer">
                    {v("enquireAbout", { room: title })}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function DaysV2DiningStrip({ sectionId }: { sectionId?: string }) {
  const th = useTranslations("DaysHome");
  const v = useTranslations("DaysV2.dining");

  return (
    <section className={`${styles.ds} ${styles.section}`} {...(sectionId ? { id: sectionId } : {})}>
      <div className={styles.diningHead}>
        <div>
          <Eyebrow>{v("eyebrow")}</Eyebrow>
          <DisplayHeading as="h2" className={styles.displayTight}>
            {v("title")}
          </DisplayHeading>
          <p className={styles.intro} style={{ marginTop: 16 }}>
            {v("intro")}
          </p>
        </div>
        <Link href={`/#${CROSSWAY_HOME.gallery}`} className={styles.linkArrow}>
          {v("linkAll")} <span>→</span>
        </Link>
      </div>
      <div className={styles.dine}>
        {daysExperienceBlocks.map((block) => {
          const id = block.id as ExperienceId;
          const [im0, im1, im2] = pickThreeImages(block.images);
          const paragraphs = th.raw(`dining.${id}.paragraphs`) as string[];
          const rest = paragraphs.slice(1);
          const hoursLine = v(`hoursFallback.${id}`);
          return (
            <div key={block.id} className={`${styles.dineRow} ${!block.imageFirst ? styles.dineRowRev : ""}`}>
              <div className={styles.dineNoCol}>
                <div className={styles.dineMetaStack}>
                  <span>{hoursLine}</span>
                  <span>
                    {v(`seats.${id}`)} {v("seatsSuffix")}
                  </span>
                </div>
              </div>
              <div className={styles.dineText}>
                <Eyebrow>{v(`kinds.${id}`)}</Eyebrow>
                <DisplayHeading as="h2" className={styles.displayTight}>
                  <Link href={`/experiences/${block.id}`} className={styles.dineTitleLink}>
                    {th(`dining.${id}.title`)}
                  </Link>
                </DisplayHeading>
                <p>{paragraphs[0]}</p>
                {rest.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
                <div className={styles.dineSig}>
                  <span>{v("highlights")}</span>
                  <strong>{v(`sig.${id}`)}</strong>
                </div>
                <Link href={`/experiences/${block.id}`} className={styles.dineExplore}>
                  {v("explore")} <span aria-hidden>→</span>
                </Link>
              </div>
              <div className={styles.dineImgs}>
                <div className={`${styles.dineImg} ${styles.dineImg0}`}>
                  <Image
                    {...imageBlurPlaceholder}
                    src={im0}
                    alt=""
                    fill
                    sizes="(max-width: 1000px) 100vw, 38vw"
                    className={styles.dineImgCover}
                    quality={84}
                  />
                </div>
                <div className={`${styles.dineImg} ${styles.dineImg1}`}>
                  <Image
                    {...imageBlurPlaceholder}
                    src={im1}
                    alt=""
                    fill
                    sizes="(max-width: 1000px) 50vw, 19vw"
                    className={styles.dineImgCover}
                    quality={80}
                  />
                </div>
                <div className={`${styles.dineImg} ${styles.dineImg2}`}>
                  <Image
                    {...imageBlurPlaceholder}
                    src={im2}
                    alt=""
                    fill
                    sizes="(max-width: 1000px) 50vw, 19vw"
                    className={styles.dineImgCover}
                    quality={80}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function DaysV2GalleryMosaic({ sectionId }: { sectionId?: string }) {
  const t = useTranslations("DaysHome.gallery");
  const v = useTranslations("DaysV2.mosaic");

  return (
    <section className={`${styles.ds} ${styles.section}`} {...(sectionId ? { id: sectionId } : {})}>
      <div className={styles.gHead}>
        <div>
          <Eyebrow>{v("eyebrow")}</Eyebrow>
          <DisplayHeading as="h2" className={styles.displayTight}>
            {v("title")}
          </DisplayHeading>
        </div>
        <Link href={`/#${CROSSWAY_HOME.galleryAll}`} className={styles.linkArrow}>
          {v("link")} <span>→</span>
        </Link>
      </div>
      <div className={styles.mosaic}>
        {GALLERY_TILES.map((g, i) => (
          <div key={i} className={`${styles.tile} ${g.w === 2 ? styles.w2 : ""} ${g.h === 2 ? styles.h2 : ""}`}>
            <div className={styles.tileImg}>
              <Image
                {...imageBlurPlaceholder}
                src={g.src}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                className={styles.tileCover}
                quality={78}
              />
            </div>
            <span className={styles.tileTag}>{g.tag}</span>
          </div>
        ))}
      </div>
      <p className={styles.intro} style={{ marginTop: 24 }}>
        {t("intro")}
      </p>
    </section>
  );
}
