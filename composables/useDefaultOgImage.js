export default function () {
  const img = useImage();
  const config = useRuntimeConfig();

  const siteIcons = config.public.siteIcons;

  const defaultImageOpts = {
    format: "png",
    quality: 90,
  };

  return siteIcons.map((icon) => {
    const iconSizes = icon.sizes.split("x");
    const iconWidth = parseInt(iconSizes[0]);
    const iconHeight = parseInt(iconSizes[1]);

    const imgUrl = img(icon.src, {
      width: iconWidth,
      height: iconHeight,
      ...defaultImageOpts,
    });

    return {
      url: imgUrl,
      width: iconWidth,
      height: iconHeight,
      alt: config.public.site.name,
      type: icon.type,
    };
  });
}
