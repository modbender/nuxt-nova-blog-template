<template>
  <div class="container mx-auto my-5 px-4">
    <template v-if="!!tagList?.data && tagList.data.length > 0">
      <h1 class="h2 border-bottom pb-3 mb-3">Tag List</h1>
      <div class="row">
        <div
          v-for="tag in tagList.data"
          class="col-sm-6 col-md-4 col-lg-3 mb-3"
          :key="tag.id"
        >
          <NuxtLink
            class="card text-decoration-none icon-link-hover h-100"
            :to="`/tag/${tag.attributes.slug}`"
          >
            <div class="card-body">
              <h2 class="h4 card-title">
                {{ tag.attributes.name }}
              </h2>
              <small class="card-text d-block text-end">
                {{ tag.attributes.posts.data.length }} posts
              </small>
            </div>
          </NuxtLink>
        </div>
      </div>
      <Pagination :count="tagList.meta.pagination.pageCount" />
    </template>
    <div v-else class="p-5 text-center display-4">No Tags to show</div>
  </div>
</template>

<script setup>
const route = useRoute();
const { find } = useStrapi();

const currentPage = computed(() => route.params?.page || 1);

const { data: tagList } = await useAsyncData(`tags-${unref(currentPage)}`, () =>
  find("tags", {
    pagination: {
      page: unref(currentPage),
      pageSize: 40,
    },
    fields: ["name", "slug", "description"],
    populate: {
      posts: {
        fields: ["id"],
      },
    },
    sort: ["name:asc"],
  })
);

useSeoMeta({
  title: "Tag List",
  description: "List of Tags for easy access to all article-related topics",
});

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d*$/.test(route.params.page);
  },
});
</script>
