<template>
  <NuxtLink class="card text-decoration-none w-100 h-100" :to="post._path">
    <NuxtImg
      preload
      format="webp"
      class="card-img-top"
      :src="post.featuredImage"
      :alt="post.title"
    />
    <div class="card-body">
      <h5 class="card-title">
        <strong>{{ post.title }}</strong>
      </h5>
      <div>
        <Icon name="mdi:clock-outline" class="me-1 mb-1" />
        <TimeAgo :dt="post.added_at" />
      </div>
      <div class="my-1">
        <span
          class="badge text-bg-primary p-2 me-2"
          v-for="tag in post.tags.slice(0, 2)"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>
      <hr class="my-2" />
      <p class="card-text">
        {{ post.description }}
      </p>
    </div>
    <div class="card-body text-primary text-end">
      <strong>Read More</strong>
      <Icon name="mdi:chevron-double-right" />
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: {
    required: true,
  },
});

const { post } = props;
</script>
