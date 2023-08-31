<template>
  <div
    v-if="!!post.featuredImage"
    class="featured-container"
    :style="{ backgroundImage: `url(${post.featuredImage})` }"
  ></div>
  <div class="container mx-auto my-5 px-4">
    <h1 class="mt-3">
      <strong>{{ post.title }}</strong>
    </h1>
    <div
      class="my-4 row justify-content-center align-items-center"
      v-if="!!post.author && !!post.author.name"
    >
      <div class="col-auto">
        <nuxt-img
          preload
          width="35"
          height="35"
          class="rounded-circle"
          :src="post.author.picture"
          :alt="post.author.name"
          v-if="!!post.author.picture"
        />
      </div>
      <div class="col">
        <strong>{{ post.author.name }}</strong>
      </div>
    </div>
    <hr class="mt-5" />
    <div class="row mx-0 mx-md-5">
      <div class="col">
        <div class="dropdown">
          <button
            type="button"
            class="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Icon name="mdi:share-variant" class="mx-1" />
            Share
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" @click="copyLink">
                <Icon name="mdi:content-copy" />
                Copy Link
              </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a
                class="dropdown-item"
                :href="`https://twitter.com/share?url=${urlNoSearch}&text=${post.title}`"
              >
                <Icon name="mdi:twitter" />
                Twitter
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                :href="`https://www.facebook.com/sharer/sharer.php?u=${urlNoSearch}`"
              >
                <Icon name="mdi:facebook" />
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col"></div>
    </div>
    <hr class="mb-5" />
    <article class="markdown-body">
      <ContentRenderer :value="post" />
    </article>
    <hr class="my-5" />
    <DisqusComments v-if="post.comments ?? true" :identifier="url.pathname" />
  </div>
</template>

<script setup>
const route = useRoute();
const url = useRequestURL();

const urlNoSearch = url.href.replace(url.search, "");

const { data: post } = await useAsyncData("post", () =>
  queryContent(`/p/${route.params.slug}`).findOne()
);

useSeoMeta({
  title: post.title,
  description: post.description,
});

const copyLink = () => {
  navigator.clipboard.writeText(urlNoSearch);
};
</script>

<style scoped>
.container {
  max-width: 680px;
}
.featured-container {
  background-position: center center;
  background-size: cover;
  height: 400px;
  width: 100%;
}
</style>
