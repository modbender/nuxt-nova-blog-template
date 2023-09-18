<template>
  <div
    v-if="post.featuredImage !== false"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-md-4">
    <NuxtImg
      preload
      quality="80"
      format="webp"
      sizes="100vw sm:340px md:600px"
      class="img-fluid w-100 d-block d-md-none mb-5"
      v-if="post.featuredImage !== false"
      :src="post.featuredImage"
      :alt="post.title"
    />

    <h1 class="mb-4">
      <strong>{{ post.title }}</strong>
    </h1>
    <h5 v-if="!!post.tags && post.tags.length > 0">
      <span
        class="badge badge-lg text-black bg-warning p-2 me-2 mb-2"
        v-for="tag in post.tags.slice(0, 2)"
        :key="tag"
      >
        {{ tag }}
      </span>
    </h5>
    <div class="row">
      <div class="col text-secondary-emphasis">
        <strong>
          <TimeAgo :pretty="true" :dt="post.added_at" />
        </strong>
      </div>
      <div class="col text-end text-secondary-emphasis">
        <i>{{ post.readingTime.text }}</i>
      </div>
    </div>
    <template v-if="post.share !== false">
      <hr class="mt-5 mb-2" />
      <PostShare :post="post" />
      <hr class="mb-5 mt-2" />
    </template>
    <hr v-else class="my-5 mt-2" />
    <article class="markdown-body">
      <ContentRenderer :value="post" />
    </article>
    <template v-if="post.share !== false">
      <hr class="mt-5 mb-2" />
      <PostShare :post="post" />
    </template>
    <template v-if="!!post.author && !!authorData">
      <hr
        class="mb-2"
        :class="{
          'mt-2': post.share !== false,
          'mt-5': !(post.share !== false),
        }"
      />
      <PostAuthorInfo :author="authorData" />
    </template>
    <hr class="mb-5 mt-2" />
  </div>
  <div v-if="post.comments !== false" class="container">
    <DisqusComments :identifier="url.pathname" />
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
    post.value.featuredImage ?? config.public.postFeaturedImagePlaceholder,
    { height: 700, quality: 90, format: "webp" }
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

useSeoMeta({
  title: post.value.title,
  description: post.value.description ?? config.public.siteDescription,
  ogImage: post.value.featuredImage,
});
</script>
