export default function (title, imageData) {
  if (!imageData) return [];

  var ogArray = [];

  const img = useImage();

  const imageAttributes = !!imageData.attributes
    ? imageData.attributes
    : imageData;

  const originalImage = {
    url: useStrapiMedia(imageAttributes.url),
    width: imageAttributes.width,
    height: imageAttributes.height,
    alt: title,
  };

  ogArray.push(originalImage);

  if (Object.keys(imageAttributes.formats).length > 0) {
    const thumbnailImageData = imageAttributes.formats.thumbnail;
    const thumbnailImage = {
      url: useStrapiMedia(thumbnailImageData.url),
      width: thumbnailImageData.width,
      height: thumbnailImageData.height,
      alt: title,
    };

    const mediumImageData = imageAttributes.formats.medium;
    const mediumImage = {
      url: useStrapiMedia(mediumImageData.url),
      width: mediumImageData.width,
      height: mediumImageData.height,
      alt: title,
    };

    const smallImageData = imageAttributes.formats.small;
    const smallImage = {
      url: useStrapiMedia(smallImageData.url),
      width: smallImageData.width,
      height: smallImageData.height,
      alt: title,
    };

    ogArray = ogArray.concat([thumbnailImage, mediumImage, smallImage]);
  }

  return ogArray.map((image) => {
    const imgUrl = img(image.url, {
      width: image.width,
      height: image.height,
      format: "jpg",
      quality: 90,
    });

    return {
      ...image,
      url: imgUrl,
    };
  });
}
