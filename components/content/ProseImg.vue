<template>
  <NuxtImg
    format="webp"
    :src="refinedSrc"
    :height="height"
    :width="width"
    :alt="alt"
  />
</template>

<script setup lang="ts">
import { joinURL } from "ufo";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const refinedSrc = computed(() => {
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    return useStrapiMedia(props.src);
  }
  return props.src;
});
</script>
