export const BLUR_DATA_URL_WARM =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><rect fill="#2e291f" width="8" height="8"/></svg>`,
  );

export const imageBlurPlaceholder = {
  placeholder: "blur" as const,
  blurDataURL: BLUR_DATA_URL_WARM,
};
