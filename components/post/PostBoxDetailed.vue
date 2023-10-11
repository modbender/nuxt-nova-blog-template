<template>
  <NuxtLink
    class="post-box-list border-primary text-decoration-none w-100 h-100 py-2"
    :to="`/p/${post.attributes.slug}`"
  >
    <div class="row mb-1">
      <div class="col pe-1">
        <div class="row">
          <div class="col-12 text-secondary-emphasis">
            <div class="h6 text-body mb-1">{{ post.attributes.title }}</div>
            <p class="d-md-block d-none text-body-secondary">
              {{ post.attributes.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-auto">
        <NuxtImg
          preload
          width="80"
          height="56"
          quality="75"
          format="webp"
          sizes="84px xs:84px md:80px"
          class="card-img-top d-sm-none d-block ps-1"
          :src="featuredImage"
          :alt="post.attributes.title"
        />
        <NuxtImg
          preload
          width="150"
          height="84"
          quality="75"
          format="webp"
          sizes="150px xs:120px md:150px"
          class="card-img-top d-sm-block d-none ps-1"
          :src="featuredImage"
          :alt="post.attributes.title"
        />
      </div>
    </div>
    <hr class="mx-5 my-2" />
    <div class="row justify-content-between">
      <div class="col-auto">
        <small
          class="text-body-secondary"
          v-if="
            !!post.attributes.tags?.data &&
            post.attributes.tags?.data.length > 0
          "
          v-for="(tag, i) in post.attributes.tags?.data.slice(0, 1)"
          :key="tag.id"
        >
          {{ tag.attributes.name }}
        </small>
      </div>
      <div class="col-auto text-info-emphasis">
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
  : config.public.featuredImagePlaceholder;
</script>
