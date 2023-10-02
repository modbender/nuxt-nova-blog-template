<template>
  <div class="container mx-auto my-5 px-4">
    <template v-if="!!postList.data && postList.data.length > 0">
      <h1 class="h2 border-bottom pb-3 mb-3">Recent Posts</h1>
      <div class="row">
        <div
          class="col-12 col-md-6 col-lg-4 my-2"
          v-for="post in postList.data"
          :key="post.id"
        >
          <PostBox :post="post" />
        </div>
      </div>
      <div class="mt-5 d-flex flex-column">
        <Pagination :count="postList.meta.pagination.pageCount" />
      </div>
    </template>
    <div v-else class="p-5 text-center display-4">No Posts to show</div>
  </div>
</template>

<script setup>
const route = useRoute();
const { find } = useStrapi();

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

useSeoMeta({
  title: "Home",
  description: useRuntimeConfig().public.siteDescription,
});

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d*$/.test(route.params.page);
  },
});
</script>
