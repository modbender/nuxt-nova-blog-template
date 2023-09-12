<template>
  <div
    v-if="author.featuredImage !== false"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-4">
    <div class="text-center">
      <NuxtImg
        preload
        width="250"
        height="250"
        quality="85"
        format="webp"
        class="rounded-circle"
        v-if="!!author.info.picture"
        :src="author.info.picture"
        :alt="author.info.name"
      />
      <h1 class="mt-3">
        <strong>{{ author.info.name }}</strong>
      </h1>
      <template v-if="!!author.info?.share">
        <hr class="mt-5 mt-2" />
        <div>
          <div class="mb-2">
            <NuxtLink
              target="_blank"
              aria-label="Go to Author's Youtube Link"
              class="me-2 text-decoration-none"
              v-if="!!author.info.share.youtube"
              :to="author.info.share.youtube"
            >
              <Icon
                width="35"
                height="35"
                name="mdi:youtube"
                class="mb-1 text-danger"
              />
            </NuxtLink>
            <NuxtLink
              target="_blank"
              aria-label="Go to Author's X Link"
              class="me-2 text-decoration-none"
              v-if="!!author.info.share.x"
              :to="author.info.share.x"
            >
              <Icon
                width="35"
                height="35"
                name="mdi:twitter"
                class="mb-1 text-info"
              />
            </NuxtLink>
            <NuxtLink
              target="_blank"
              aria-label="Go to Author's Facebook Link"
              class="me-2 text-decoration-none"
              v-if="!!author.info.share.facebook"
              :to="author.info.share.facebook"
            >
              <Icon
                class="mb-1"
                width="35"
                height="35"
                name="mdi:facebook-box"
              />
            </NuxtLink>
            <NuxtLink
              target="_blank"
              aria-label="Go to Author's Instagram Link"
              class="me-2 text-decoration-none"
              v-if="!!author.info.share.instagram"
              :to="author.info.share.instagram"
            >
              <Icon
                width="35"
                height="35"
                name="mdi:instagram"
                class="mb-1 text-warning"
              />
            </NuxtLink>
          </div>
          <div v-if="!!author.info.share.custom">
            <NuxtLink
              target="_blank"
              class="me-2 text-decoration-none"
              :aria-label="`Go to Author's ${customName} Link`"
              v-for="(customLink, customName, i) in author.info.share.custom"
              :to="customLink"
              :key="i"
            >
              <Icon class="mb-1" name="mdi:link-variant" />
              {{ customName }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </div>
    <hr class="mb-5 mt-2" />
    <article class="markdown-body">
      <ContentRenderer :value="author" />
    </article>
    <hr class="mt-5" :class="{ 'mb-5': !(author.share !== false) }" />
    <template v-if="author.share !== false">
      <PostShare :post="author" />
      <hr class="mb-5 mb-2" />
    </template>
    <h3 class="text-center mb-3">Posts by this Author</h3>
    <div v-if="!!authorPosts && authorPosts.length > 0" class="row">
      <div class="col-12 col-md-6 my-2" v-for="post in authorPosts" :key="post">
        <PostBox :post="post" />
      </div>
    </div>
    <div v-else class="p-5 text-center display-6">No posts yet</div>
  </div>
  <div v-if="author.comments !== false" class="container">
    <hr class="mt-5" />
    <DisqusComments :identifier="url.pathname" />
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

const { data: authorPosts } = await useAsyncData("postList", () =>
  queryContent("p")
    .where({ _draft: false, author: route.params.slug })
    .sort({ added_at: -1 })
    .find()
);

const backgroundStyles = computed(() => {
  const imgUrl = img(
    author.featuredImage ?? config.public.postFeaturedImagePlaceholder,
    { format: "webp" }
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

useSeoMeta({
  title: author.value.info.name,
  description: author.value.description ?? config.public.siteDescription,
  ogImage: author.value.featuredImage,
});
</script>
