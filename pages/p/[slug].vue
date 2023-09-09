<template>
  <div
    v-if="post.featuredImage !== false"
    class="featured-container"
    :style="{
      backgroundImage: `url(${
        post.featuredImage ?? $config.public.postFeaturedImagePlaceholder
      })`,
    }"
  ></div>
  <div class="container-post mx-auto my-5 px-4">
    <h1 class="mt-3">
      <strong>{{ post.title }}</strong>
    </h1>
    <div
      class="my-4 row justify-content-center align-items-center"
      v-if="!!post.author && !!post.author.name"
    >
      <div class="col-auto">
        <!-- <NuxtImg
          preload
          width="35"
          height="35"
          format="webp"
          class="rounded-circle"
          :src="post.author.picture"
          :alt="post.author.name"
          v-if="!!post.author.picture"
        /> -->
        <img
          width="35"
          height="35"
          class="rounded-circle"
          :src="post.author.picture"
          :alt="post.author.name"
        />
      </div>
      <div class="col">
        <strong>{{ post.author.name }}</strong>
      </div>
    </div>
    <hr class="mt-5 mb-2" />
    <PostShare :post="post" />
    <hr class="mb-5 mt-2" />
    <article class="markdown-body">
      <ContentRenderer :value="post" />
    </article>
    <hr class="my-5" />
  </div>
  <div class="container">
    <DisqusComments v-if="post.comments !== false" :identifier="url.pathname" />
  </div>
</template>

<script setup>
const route = useRoute();
const url = useRequestURL();

const { data: post } = await useAsyncData("post", () =>
  queryContent(`/p/${route.params.slug}`).findOne()
);

useSeoMeta({
  title: post.value.title,
  description:
    post.value.description ?? useRuntimeConfig().public.siteDescription,
  ogImage: post.value.featuredImage,
});
</script>
