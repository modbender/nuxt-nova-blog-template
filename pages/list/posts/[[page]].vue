<template>
  <div class="container mx-auto my-5 px-4">
    <h1 class="h2 border-bottom pb-3 mb-3">Post List</h1>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li
          class="breadcrumb-item"
          :class="{ active: $route.path === breadcrumb.item }"
          v-for="breadcrumb in breadcrumbItems"
          :key="breadcrumb.name"
        >
          <strong v-if="$route.path === breadcrumb.item">
            {{ breadcrumb.name }}
          </strong>
          <NuxtLink v-else class="text-decoration-none" :to="breadcrumb.item">
            {{ breadcrumb.name }}
          </NuxtLink>
        </li>
      </ol>
    </nav>
    <hr />
    <PostList :post-list="postList" />
  </div>
</template>

<script setup>
const route = useRoute();
const { find } = useStrapi();

const currentPage = computed(() => route.params?.page || 1);

const { data: postList } = await useAsyncData(
  `posts-list-${unref(currentPage)}`,
  () =>
    find("posts", {
      pagination: {
        page: unref(currentPage),
        pageSize: 12,
      },
      fields: ["title", "slug", "description", "createdAt"],
      populate: ["featuredImage", "tags"],
      sort: ["createdAt:desc"],
    })
);

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Post List", item: "/list/posts" },
];

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: breadcrumbItems,
  }),
]);

useSeoMeta({
  title: "Post List",
  description:
    "List of Posts to stay updated and informed on a wide range of topics",
  twitterCard: "summary_large_image",
});

definePageMeta({
  name: "PostList",
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d*$/.test(route.params.page);
  },
});
</script>
