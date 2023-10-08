<template>
  <NuxtLink
    class="post-box-grid card text-decoration-none w-100 h-100"
    :to="`/p/${post.attributes.slug}`"
  >
    <NuxtImg
      preload
      width="380"
      height="290"
      quality="70"
      format="webp"
      sizes="xs:290px sm:450px md:305px lg:380px"
      class="card-img-top"
      :src="featuredImage"
      :alt="post.attributes.title"
    />
    <div class="card-body h-100">
      <div
        v-if="
          !!post.attributes.tags?.data && post.attributes.tags?.data.length > 0
        "
        class="mb-3"
      >
        <span
          class="badge text-black bg-warning p-2 me-2"
          v-for="tag in post.attributes.tags.data.slice(0, 2)"
          :key="tag.id"
        >
          {{ tag.attributes.name }}
        </span>
      </div>
      <div class="card-title h5">
        <strong>{{ post.attributes.title }}</strong>
      </div>
      <hr class="my-2" />
      <div class="card-text">
        <p>{{ post.attributes.description }}</p>
      </div>
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

const featuredImage = !!unref(post).attributes.featuredImage?.data
  ? useStrapiMedia(unref(post).attributes.featuredImage.data.attributes.url)
  : config.public.postFeaturedImagePlaceholder;
</script>
