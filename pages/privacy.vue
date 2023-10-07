<template>
  <div
    v-if="!!privacyFeaturedImage?.id"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-md-4">
    <div class="markdown-body">
      <h1>{{ privacyPage.attributes.title }}</h1>
      <MDC :value="privacyPage.attributes.content" tag="article" />
    </div>
  </div>
</template>

<script setup>
const img = useImage();
const config = useRuntimeConfig();
const { findOne } = useStrapi();

const { data } = await useAsyncData("privacyPage", () =>
  findOne("privacy", { populate: "*" })
);

const { data: privacyPage } = unref(data);
const privacyFeaturedImage = privacyPage.attributes.featuredImage?.data;
const privacyOgImageData = !!privacyFeaturedImage
  ? useStrapiOgImage(privacyPage.attributes.title, privacyFeaturedImage)
  : [];

const backgroundStyles = computed(() => {
  if (!privacyFeaturedImage) return null;

  const imgUrl = img(privacyFeaturedImage.attributes.url);
  return { backgroundImage: `url('${imgUrl}')` };
});

const imageMetaData =
  privacyOgImageData.length > 0
    ? {
        ogImage: privacyOgImageData,
      }
    : {};

const metaData = {
  title: privacyPage.attributes.title,
  description:
    privacyPage.attributes.description ||
    privacyPage.attributes.content ||
    privacyPage.attributes.title,
  twitterCard: "summary_large_image",

  ...imageMetaData,
};

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: privacyPage.attributes.title, item: "/privacy" }],
  }),
]);

useSeoMeta(metaData);
</script>
