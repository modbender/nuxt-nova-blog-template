<template>
  <div
    v-if="author.featuredImage !== false"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-4">
    <h1 class="mt-3">
      <strong>{{ author.title }}</strong>
    </h1>
    <div
      class="my-4 row justify-content-center align-items-center"
      v-if="!!author.author && !!author.author.name"
    >
      <div class="col-auto">
        <NuxtImg
          preload
          width="35"
          height="35"
          format="webp"
          class="rounded-circle"
          v-if="!!author.author.picture"
          :src="author.author.picture"
          :alt="author.author.name"
        />
      </div>
      <div class="col">
        <strong>{{ author.author.name }}</strong>
      </div>
    </div>
    <hr class="mt-5 mb-2" />
    <PostShare v-if="author.share !== false" :post="author" />
    <hr class="mb-5 mt-2" />
    <article class="markdown-body">
      <ContentRenderer :value="author" />
    </article>
    <hr class="my-5" />
  </div>
  <div class="container">
    <DisqusComments
      v-if="author.comments !== false"
      :identifier="url.pathname"
    />
  </div>
</template>

<script setup>
const img = useImage();
const route = useRoute();
const url = useRequestURL();
const config = useRuntimeConfig();

const { data: author } = await useAsyncData("author", () =>
  queryContent(`/author/${route.params.slug}`).findOne()
);

const backgroundStyles = computed(() => {
  const imgUrl = img(
    author.featuredImage ?? config.public.postFeaturedImagePlaceholder
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

useSeoMeta({
  title: author.value.info.name,
  description: author.value.description ?? config.public.siteDescription,
  ogImage: author.value.featuredImage,
});
</script>
