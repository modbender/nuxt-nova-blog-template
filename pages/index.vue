<template>
  <div class="container mx-auto my-5 px-4">
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 my-2"
        v-for="post in postList"
        :key="post"
      >
        <PostBox :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Home",
  description: useRuntimeConfig().public.siteDescription,
});

const { data: postList } = await useAsyncData("postList", () =>
  queryContent("p").sort({ added_at: -1 }).find()
);
</script>
