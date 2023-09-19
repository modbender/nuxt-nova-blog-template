<template>
  <template v-if="!!prevPost || !!nextPost">
    <h4 class="mb-3">You might also like:</h4>
    <NuxtLink
      :to="prevPost._path"
      class="card h-100 mb-3 me-md-auto related-card"
      :style="prevPostStyles"
      v-if="!!prevPost"
    >
      <div class="card-body p-4">
        <h5 class="card-title">{{ prevPost.title }}</h5>
        <p class="card-text text-truncate">
          {{ prevPost.description }}
        </p>
      </div>
    </NuxtLink>
    <NuxtLink
      :to="nextPost._path"
      class="card h-100 ms-md-auto related-card"
      :style="nextPostStyles"
      v-if="!!nextPost"
    >
      <div class="card-body p-4">
        <h5 class="card-title">{{ nextPost.title }}</h5>
        <p class="card-text text-truncate">
          {{ nextPost.description }}
        </p>
      </div>
    </NuxtLink>
  </template>
</template>

<script setup>
const img = useImage();
const route = useRoute();

const [prevPost, nextPost] = await queryContent("/p")
  .only(["_path", "title"])
  .sort({ added_at: -1 })
  .where({ _draft: false })
  .findSurround(route.path);

const prevPostStyles = computed(() => {
  const imgUrl = img(
    prevPost.featuredImage ?? config.public.postFeaturedImagePlaceholder,
    { height: 200, quality: 60, format: "webp" }
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

const nextPostStyles = computed(() => {
  const imgUrl = img(
    nextPost.featuredImage ?? config.public.postFeaturedImagePlaceholder,
    { height: 200, quality: 60, format: "webp" }
  );
  return { backgroundImage: `url('${imgUrl}')` };
});
</script>
