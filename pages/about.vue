<template>
  <div
    v-if="!!aboutFeaturedImage?.id"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-md-4">
    <div class="markdown-body">
      <h1>{{ aboutPage.attributes.title }}</h1>
      <MDC :value="aboutPage.attributes.content" tag="article" />
    </div>
  </div>
</template>

<script setup>
const img = useImage();
const config = useRuntimeConfig();
const { findOne } = useStrapi();

const { data } = await useAsyncData("aboutPage", () =>
  findOne("about", { populate: "*" })
);

const { data: aboutPage } = unref(data);
const aboutFeaturedImage = aboutPage.attributes.featuredImage?.data;
const aboutOgImageData = !!aboutFeaturedImage
  ? useStrapiOgImage(aboutPage.attributes.title, aboutFeaturedImage)
  : [];

const backgroundStyles = computed(() => {
  if (!aboutFeaturedImage) return null;

  const imgUrl = img(aboutFeaturedImage.attributes.url);
  return { backgroundImage: `url('${imgUrl}')` };
});

const imageMetaData =
  aboutOgImageData.length > 0
    ? {
        ogImage: aboutOgImageData,
      }
    : {};

const metaData = {
  title: aboutPage.attributes.title,
  description:
    aboutPage.attributes.description ||
    aboutPage.attributes.content ||
    aboutPage.attributes.title,
  twitterCard: "summary_large_image",

  ...imageMetaData,
};

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: aboutPage.attributes.title, item: "/about" }],
  }),
]);

useSeoMeta(metaData);
</script>
