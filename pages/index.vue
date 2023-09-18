<template>
  <div class="container mx-auto my-5 px-4">
    <div v-if="!!postList && postList.length > 0">
      <div class="row">
        <div
          class="col-12 col-md-6 col-lg-4 my-2"
          v-for="post in postList.slice(startIndex, endIndex)"
          :key="post"
        >
          <PostBox :post="post" />
        </div>
      </div>
      <div class="mt-5 d-flex flex-column">
        <Pagination :count="pageCount" />
      </div>
    </div>
    <div v-else class="p-5 text-center display-4">Add posts to show here</div>
  </div>
</template>

<script setup>
const route = useRoute();

useSeoMeta({
  title: "Home",
  description: useRuntimeConfig().public.siteDescription,
});

const { data: postList } = await useAsyncData("postList", () =>
  queryContent("p").sort({ added_at: -1 }).where({ _draft: false }).find()
);

const postLimit = 6;
const pageCount = Math.ceil(postList.value.length / postLimit);

const currentPage = computed(() => parseInt(route.query?.page) || 1);

const startIndex = computed(() => postLimit * (currentPage.value - 1));
const endIndex = computed(
  () => postLimit * (currentPage.value - 1) + postLimit
);
</script>
