<template>
  {{ formattedDate }}
</template>

<script setup>
import { useTimeAgo } from "@vueuse/core";

const props = defineProps({
  dt: {
    required: true,
  },
});
const { dt } = toRefs(props);

const formattedDate = useTimeAgo(new Date(dt.value));
</script>
