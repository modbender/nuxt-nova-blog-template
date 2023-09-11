<template>
  <div
    v-if="navPage.featuredImage !== false"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-4">
    <h1 class="mt-3">
      <strong>{{ navPage.title }}</strong>
    </h1>
    <div
      class="my-4 row justify-content-center align-items-center"
      v-if="!!navPage.author && !!navPage.author.name"
    >
      <div class="col-auto">
        <NuxtImg
          preload
          width="35"
          height="35"
          format="webp"
          class="rounded-circle"
          v-if="!!navPage.author.picture"
          :src="navPage.author.picture"
          :alt="navPage.author.name"
        />
      </div>
      <div class="col">
        <strong>{{ navPage.author.name }}</strong>
      </div>
    </div>
    <hr class="mt-5 mb-2" />
    <PostShare v-if="navPage.share !== false" :post="navPage" />
    <hr class="mb-5 mt-2" />
    <article class="markdown-body">
      <ContentRenderer :value="navPage" />
    </article>
    <hr class="my-5" />
  </div>
  <div class="container">
    <DisqusComments
      v-if="navPage.comments !== false"
      :identifier="url.pathname"
    />
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
    navPage.featuredImage ?? config.public.postFeaturedImagePlaceholder
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

useSeoMeta({
  title: navPage.value.title,
  description: navPage.value.description ?? config.public.siteDescription,
  ogImage: navPage.value.featuredImage,
});
</script>
