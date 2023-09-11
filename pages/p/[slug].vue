<template>
  <div
    v-if="post.featuredImage !== false"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-4">
    <h1 class="mt-3">
      <strong>{{ post.title }}</strong>
    </h1>
    <hr class="mt-5 mb-2" />
    <PostShare v-if="post.share !== false" :post="post" />
    <hr class="mb-5 mt-2" />
    <article class="markdown-body">
      <ContentRenderer :value="post" />
    </article>
    <hr class="mt-5" />
    <PostShare v-if="post.share !== false" :post="post" />
    <template v-if="!!post.author && !!authorData">
      <hr class="mx-2" />
      <PostAuthorInfo :author="authorData" />
    </template>
    <hr class="mx-2" />
  </div>
  <div class="container">
    <DisqusComments v-if="post.comments !== false" :identifier="url.pathname" />
  </div>
</template>

<script setup>
const img = useImage();
const route = useRoute();
const url = useRequestURL();
const config = useRuntimeConfig();

const { data: post } = await useAsyncData("post", () =>
  queryContent(`/p/${route.params.slug}`).findOne()
);

const { data: authorData } = await useAsyncData("authorData", () =>
  queryContent(`/author/${post.value.author}`).findOne()
);

const backgroundStyles = computed(() => {
  const imgUrl = img(
    post.featuredImage ?? config.public.postFeaturedImagePlaceholder
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

useSeoMeta({
  title: post.value.title,
  description: post.value.description ?? config.public.siteDescription,
  ogImage: post.value.featuredImage,
});
</script>
