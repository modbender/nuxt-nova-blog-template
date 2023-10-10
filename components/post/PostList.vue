<template>
  <template v-if="!!postList.data && postList.data.length > 0">
    <div v-if="currentStyle === 'grid'" class="row">
      <div
        class="col-12 col-md-6 col-lg-4 my-2"
        v-for="post in postList.data"
        :key="post.id"
      >
        <PostBoxGrid :post="post" />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 my-2" v-for="post in postList.data" :key="post.id">
        <PostBoxDetailed :post="post" />
        <hr class="my-1" />
      </div>
    </div>
    <div class="mt-5 d-flex flex-column">
      <Pagination :count="postList.meta.pagination.pageCount" />
    </div>
  </template>
  <div v-else class="p-5 text-center display-4">No Posts to show</div>
</template>

<script setup>
const styleTypes = ["grid", "list"];

const props = defineProps({
  postList: {
    required: true,
  },
  overrideStyle: String,
});

const { postList, overrideStyle } = toRefs(props);

let currentStyle = computed(() => {
  const overrideStyleValue = unref(overrideStyle);

  if (!!overrideStyleValue) {
    if (!styleTypes.includes(overrideStyleValue)) {
      throw createError({
        statusCode: 500,
        statusMessage: "Prop override-style has invalid value",
      });
    }
    return overrideStyleValue;
  }

  const postListStyle =
    useRuntimeConfig().public.nuxtNovaControl?.postListStyle;

  if (!!postListStyle) {
    if (!styleTypes.includes(postListStyle)) {
      throw createError({
        statusCode: 500,
        statusMessage: "Config nuxtNovaControl.postListStyle has invalid value",
      });
    }
    return postListStyle;
  } else {
    return styleTypes[0];
  }
});
</script>
