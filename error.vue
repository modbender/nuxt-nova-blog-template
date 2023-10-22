<template>
  <main class="error-page-container">
    <div class="error-page-box">
      <div class="error-page-content">
        <h1 class="display-1">
          {{ error.statusCode }}
        </h1>
        <h2 class="display-6">
          {{ error.message || error.statusMessage || "" }}
        </h2>
        <hr />
        <button class="btn btn-outline-warning btn-lg" @click="handleError">
          <Icon class="mb-1" name="mdi:home" />
          Go Home
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const { error } = toRefs(props);

const handleError = () => clearError({ redirect: "/" });
</script>
