<template>
  <template v-if="!!relatedPosts?.data?.length > 0">
    <div class="h4 mb-3">You might also like:</div>
    <NuxtLink
      v-for="relatedPost in relatedPosts.data"
      class="card h-100 mb-3 me-md-auto related-card"
      :to="`/p/${relatedPost.attributes.slug}`"
      :key="relatedPost.id"
    >
      <div class="card-body p-4 bg-black">
        <div class="h5 card-title text-white">
          <strong>{{ relatedPost.attributes.title }}</strong>
        </div>
        <p class="card-text text-truncate text-white-50">
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
</script>
