<template>
  <div class="container mx-auto my-5 px-md-4">
    <h1 class="h2 border-bottom pb-3 mb-3">Search</h1>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">
        <Icon name="mdi:magnify" />
      </span>
      <input
        name="title"
        type="search"
        v-model="searchText"
        class="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="Search posts using title name"
      />
    </div>
    <hr />
    <template v-if="searchText !== '' && searchText.length > 2">
      <template v-if="!!searchResults && searchResults.length > 0">
        <div class="row">
          <div
            class="col-12 my-2"
            v-for="(post, i) in searchResults"
            :key="post.id"
          >
            <PostBoxDetailed :post="post" />
            <hr class="my-1" />
          </div>
        </div>
      </template>
      <div v-else class="p-5 text-center display-6">No results found</div>
    </template>
    <div
      v-if="searchText.length < 3"
      class="p-5 text-center d-flex flex-column"
    >
      <strong class="display-4">Type to search</strong>
      <small>Min 3 characters</small>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const searchText = ref(route.query?.title || "");
const react = reactive({ searchText });

const searchResults = computed(() => {
  if (react.searchText.length < 3) return [];

  const data = unref(allPosts).filter(function (post) {
    const title = post.attributes.title.toString();
    const newRegex = new RegExp(react.searchText, "gi");
    return title.match(newRegex) != null;
  });

  return data;
});

const allPosts = await getAllPosts();

watch(searchText, async (newSearchText) => {
  router.push({ query: { title: newSearchText } });
});

useSchemaOrg([
  defineWebPage({
    "@type": ["CollectionPage", "SearchResultsPage"],
  }),
  defineBreadcrumb({
    itemListElement: [{ name: "Search", item: "/search" }],
  }),
]);

useSeoMeta({
  title: "Search",
  description: "Search through complete list of post using it's title",
  twitterCard: "summary_large_image",
});
</script>
