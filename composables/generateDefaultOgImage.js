export default function () {
  const config = useRuntimeConfig();
  const icons = config.public.siteIcons;

  const defaultImageOpts = {
    format: "webp",
    quality: 90,
  };

  return icons.map((icon) => {
    const [iconWidth, iconHeight] = icon.sizes.split("x");

    const imgUrl = img(icon.src, {
      ...defaultImageOpts,
      width: iconWidth,
      height: iconHeight,
    });

    return {
      url: imgUrl,
      width: iconWidth,
      height: iconHeight,
      alt: config.public.site.name,
    };
  });
}
