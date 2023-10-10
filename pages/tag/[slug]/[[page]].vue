<template>
  <div class="container mx-auto my-5 px-4">
    <div class="text-center">
      <h1>{{ tag.attributes.name }}</h1>
      <small v-if="!!tag.attributes.description">
        {{ tag.attributes.description }}
      </small>
    </div>
    <hr />
    <nav aria-label="breadcrumb" id="breadcrumb">
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
    <PostList :post-list="tagPosts" />
  </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const { find } = useStrapi();

const currentPage = computed(() => route.params?.page || 1);

const { data: tagListData } = await useAsyncData(
  `tag-${route.params.slug}`,
  () =>
    find("tags", {
      filters: {
        slug: {
          $eq: route.params.slug,
        },
      },
    })
);

const { data: tagList } = unref(tagListData);

if (tagList.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "Tag Not Found" });
}

const tag = tagList[0];

const { data: tagPosts } = await useAsyncData(
  `tag-posts-${route.params.slug}-${unref(currentPage)}`,
  () =>
    find("posts", {
      filters: {
        tags: {
          slug: {
            $eq: route.params.slug,
          },
        },
      },
      pagination: {
        page: unref(currentPage),
        pageSize: 6,
      },
      populate: ["featuredImage", "tags"],
      sort: ["createdAt:desc"],
    })
);

const ogImageOptions = {
  title: tag.attributes.name,
  description: `See posts tagged ${tag.attributes.name}`,
};

const metaData = {
  title: `${tag.attributes.name} | Tag`,
  description: tag.attributes.description ?? config.public.site.description,
  ogImageAlt: `${tag.attributes.name} Tag`,
  twitterCard: "summary_large_image",
};

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Tag List", item: "/list/tags" },
  { name: tag.attributes.name, item: route.path },
];

defineOgImage(ogImageOptions);

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: breadcrumbItems,
  }),
]);

useSeoMeta(metaData);

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d*$/.test(route.params.page);
  },
});
</script>
