<template>
  <NuxtLink
    class="post-box card text-decoration-none w-100 h-100"
    :to="`/p/${post.attributes.slug}`"
  >
    <NuxtImg
      preload
      width="380"
      height="290"
      quality="75"
      format="webp"
      class="card-img-top"
      :src="featuredImage"
      :alt="post.title"
    />
    <div class="card-body h-100">
      <div v-if="!!post.tags && post.tags.length > 0" class="mb-3">
        <span
          class="badge text-black bg-warning p-2 me-2"
          v-for="tag in post.tags.slice(0, 2)"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>
      <h5 class="card-title">
        <strong>{{ post.attributes.title }}</strong>
      </h5>
      <hr class="my-2" />
      <p class="card-text">
        {{ post.attributes.description }}
      </p>
    </div>
    <div class="card-body row">
      <div class="col text-info-emphasis">
        <Icon name="mdi:clock-outline" class="me-1 mb-1" />
        <TimeAgo :dt="post.attributes.createdAt" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  post: {
    required: true,
  },
});

const { post } = toRefs(props);

const featuredImage = !!post.value.attributes.featuredImage.data
  ? useStrapiMedia(post.value.attributes.featuredImage.data.attributes.url)
  : config.public.postFeaturedImagePlaceholder;
</script>
