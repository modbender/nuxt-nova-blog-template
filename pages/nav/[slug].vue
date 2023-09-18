<template>
  <div
    v-if="navPage.featuredImage !== false"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-4">
    <template v-if="navPage.share !== false">
      <hr class="mt-5 mb-2" />
      <PostShare :post="navPage" />
      <hr class="mb-5 mt-2" />
    </template>
    <article class="markdown-body">
      <ContentRenderer :value="navPage" />
    </article>
    <hr v-if="navPage.comments !== false" class="my-5" />
  </div>
  <div v-if="navPage.comments !== false" class="container">
    <DisqusComments :identifier="url.pathname" />
  </div>
</template>

<script setup>
const img = useImage();
const route = useRoute();
const url = useRequestURL();
const config = useRuntimeConfig();

const { data: navPage } = await useAsyncData("navPage", () =>
  queryContent(`/nav/${route.params.slug}`).findOne()
);

const backgroundStyles = computed(() => {
  const imgUrl = img(
    navPage.value.featuredImage ?? config.public.postFeaturedImagePlaceholder
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

useSeoMeta({
  title: navPage.value.title,
  description: navPage.value.description ?? config.public.siteDescription,
  ogImage: navPage.value.featuredImage,
});
</script>
