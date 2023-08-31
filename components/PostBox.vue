<template>
  <NuxtLink class="card text-decoration-none w-100 h-100" :to="data._path">
    <nuxt-img
      preload
      class="card-img-top"
      :src="data.featuredImage"
      :alt="data.title"
    />
    <div class="card-body">
      <h5 class="card-title">
        <strong>{{ data.title }}</strong>
      </h5>
      <p class="card-text">
        {{ data.description }}
      </p>
    </div>
    <div class="mx-3">
      <span
        class="badge rounded-pill text-bg-primary p-2 mx-1"
        v-for="tag in data.tags"
        :key="tag"
      >
        {{ tag }}
      </span>
    </div>
    <div class="card-body text-primary text-end">
      <strong>Read More</strong>
      <Icon name="mdi:chevron-double-right" />
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  data: {
    required: true,
  },
});
</script>
