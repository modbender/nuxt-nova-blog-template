<template>
  <NuxtLink
    class="post-box-list row border-primary text-decoration-none w-100 h-100 py-2"
    :to="`/p/${post.attributes.slug}`"
  >
    <div class="col-auto">
      <NuxtImg
        preload
        width="150px"
        quality="75"
        format="webp"
        sizes="150px xs:120px md:150px lg:170px"
        class="card-img-top"
        :src="featuredImage"
        :alt="post.title"
      />
    </div>
    <div class="col">
      <div class="row">
        <div class="col-12 text-secondary-emphasis">
          <h4>{{ post.attributes.title }}</h4>
          <p>{{ post.attributes.description }}</p>
        </div>
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

const featuredImage = !!post.value.attributes.featuredImage?.data
  ? useStrapiMedia(post.value.attributes.featuredImage.data.attributes.url)
  : config.public.postFeaturedImagePlaceholder;
</script>
