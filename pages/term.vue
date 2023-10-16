<template>
  <div>
    <div
      v-if="!!termFeaturedImage?.id"
      class="featured-container"
      :style="backgroundStyles"
    ></div>
    <div class="container-post mx-auto my-5 px-md-4">
      <div class="markdown-body">
        <h1>{{ termPage.attributes.title }}</h1>
        <MDC :value="termPage.attributes.content" tag="article" />
      </div>
    </div>
  </div>
</template>

<script setup>
const img = useImage();
const config = useRuntimeConfig();
const { findOne } = useStrapi();

const { data } = await useAsyncData("termPage", () =>
  findOne("term", { populate: "*" })
);

const { data: termPage } = unref(data);
const termFeaturedImage = termPage.attributes.featuredImage?.data;
const termOgImageData = !!termFeaturedImage
  ? useStrapiOgImage(termPage.attributes.title, termFeaturedImage)
  : [];

const backgroundStyles = computed(() => {
  if (!termFeaturedImage) return null;

  const imgUrl = img(termFeaturedImage.attributes.url);
  return { backgroundImage: `url('${imgUrl}')` };
});

const imageMetaData =
  termOgImageData.length > 0
    ? {
        ogImage: termOgImageData,
      }
    : {};

const metaData = {
  title: termPage.attributes.title,
  description:
    termPage.attributes.description ||
    termPage.attributes.content ||
    termPage.attributes.title,
  twitterCard: "summary_large_image",

  ...imageMetaData,
};

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: termPage.attributes.title, item: "/term" }],
  }),
]);

useSeoMeta(metaData);
</script>
