<template>
  <template v-if="!!relatedPosts?.data?.length > 0">
    <div class="h4 mb-3">You might also like:</div>
    <NuxtLink
      v-for="relatedPost in relatedPosts.data"
      class="card h-100 mb-3 me-md-auto related-card"
      :style="relatedPostStyles(relatedPost)"
      :to="`/p/${relatedPost.attributes.slug}`"
      :key="relatedPost.id"
    >
      <div class="card-body p-4">
        <div class="h5 card-title">{{ relatedPost.attributes.title }}</div>
        <p class="card-text text-truncate">
          {{ relatedPost.attributes.description }}
        </p>
      </div>
    </NuxtLink>
  </template>
</template>

<script setup>
const img = useImage();
const config = useRuntimeConfig();
const { find } = useStrapi();

const props = defineProps({
  post: {
    required: true,
  },
});

const { post } = toRefs(props);
const tags = unref(post).attributes.tags?.data;

const tagsFilter = computed(() => {
  if (!tags && !tags.length > 0) return [];

  return tags.map((tag) => ({
    tags: {
      name: {
        $containsi: tag.attributes.name,
      },
    },
  }));
});

const { data: relatedPosts } = await useAsyncData(
  `relatedPosts-${unref(post).attributes.slug}`,
  () =>
    find("posts", {
      filters: {
        $or: [
          {
            title: {
              $containsi: unref(post).attributes.title,
            },
          },
          ...unref(tagsFilter),
        ],
        id: {
          $ne: unref(post).id,
        },
      },
      pagination: {
        pageSize: 2,
      },
      fields: ["title", "slug", "description"],
      populate: ["featuredImage"],
    })
);

const relatedPostStyles = (relatedPost) => {
  const currentUrl = !!relatedPost.attributes.featuredImage?.data?.attributes
    ?.url
    ? useStrapiMedia(relatedPost.attributes.featuredImage.data.attributes.url)
    : config.public.postFeaturedImagePlaceholder;

  const imgUrl = img(currentUrl, { height: 200, quality: 60, format: "webp" });
  return { backgroundImage: `url('${imgUrl}')` };
};
</script>
