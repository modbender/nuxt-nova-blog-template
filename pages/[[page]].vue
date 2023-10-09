<template>
  <div class="container mx-auto my-5 px-4">
    <h1 class="h2 border-bottom pb-3 mb-3">Recent Posts</h1>
    <PostList :post-list="postList" />
  </div>
</template>

<script setup>
const route = useRoute();
const { find } = useStrapi();
const defaultOgImage = useDefaultOgImage();

// console.log(defaultOgImage);

const currentPage = computed(() => route.params?.page || 1);

const { data: postList } = await useAsyncData(
  `posts-${unref(currentPage)}`,
  () =>
    find("posts", {
      pagination: {
        page: unref(currentPage),
        pageSize: 6,
      },
      fields: ["title", "slug", "description", "createdAt"],
      populate: ["featuredImage", "tags"],
      sort: ["createdAt:desc"],
    })
);

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: "Home", item: "/" }],
  }),
]);

useSeoMeta({
  title: "Home",
  description: useRuntimeConfig().public.site.description,
  twitterCard: "summary_large_image",
  
});

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d*$/.test(route.params.page);
  },
});
</script>
