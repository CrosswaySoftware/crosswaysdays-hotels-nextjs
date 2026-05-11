/** Sister property microsites — origins align with Crossway main `hotelSiteUrls`. */
export const CROSSWAY_CORPORATE_URL = "https://www.crosswayhotels.com/";

export type SisterSiteId = "days" | "palomar" | "lifotel" | "revostay" | "petit";

const ORIGIN: Record<SisterSiteId, string> = {
  days: "https://crosswaydayshotel.com",
  palomar: "https://palomarbycrossway.com",
  lifotel: "https://lifotel.com",
  revostay: "https://revostay.com",
  petit: "https://petitpalaiscrossway.com",
};

/** next-intl keys under each property’s `*Nav` namespace */
export const SISTER_SITE_LABEL_KEYS: Record<SisterSiteId, string> = {
  days: "sisterDays",
  palomar: "sisterPalomar",
  lifotel: "sisterLifotel",
  revostay: "sisterRevostay",
  petit: "sisterPetit",
};

export function sisterSitesFor(current: SisterSiteId): SisterSiteId[] {
  const all: SisterSiteId[] = ["days", "palomar", "lifotel", "revostay", "petit"];
  return all.filter((id) => id !== current);
}

/** Locale-prefixed microsite home (`/en`, `/ar`, `/fr`). */
export function sisterMicrositeUrl(site: SisterSiteId, locale: string): string {
  const base = ORIGIN[site].replace(/\/$/, "");
  const loc = ["en", "ar", "fr"].includes(locale) ? locale : "en";
  return `${base}/${loc}`;
}
