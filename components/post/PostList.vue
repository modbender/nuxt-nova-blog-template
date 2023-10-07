<template>
  <template v-if="!!postList.data && postList.data.length > 0">
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 my-2"
        v-for="post in postList.data"
        :key="post.id"
      >
        <PostBoxGrid :post="post" />
      </div>
    </div>
    <div class="mt-5 d-flex flex-column">
      <Pagination :count="postList.meta.pagination.pageCount" />
    </div>
  </template>
  <div v-else class="p-5 text-center display-4">No Posts to show</div>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  postList: {
    required: true,
  },
  overrideStyle: {
    type: Boolean,
    default: () => false,
  },
});

const { postList, overrideStyle } = toRefs(props);

const styleTypes = ["grid", "list"];

const currentStyle = computed(() => {
  let postListStyle = config.nuxtNovaControl.postListStyle;

  if (!styleTypes.includes(postListStyle)) {
    postListStyle = styleTypes[0];
  }

  if (unref(overrideStyle)) {
    postListStyle =
      postListStyle === styleTypes[0] ? styleTypes[1] : styleTypes[0];
  }

  return postListStyle;
});
</script>
