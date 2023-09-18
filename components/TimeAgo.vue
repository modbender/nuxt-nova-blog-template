<template>
  <template v-if="pretty === true">
    {{ prettyDate }}
  </template>
  <template v-else>
    {{ formattedDate }}
  </template>
</template>

<script setup>
import { useTimeAgo } from "@vueuse/core";

const props = defineProps({
  dt: {
    required: true,
  },
  pretty: {
    default: false,
  },
});
const { dt, pretty } = toRefs(props);

const formattedDate = useTimeAgo(new Date(dt.value));

const prettyDate = useDateFormat(new Date(dt.value), "MMM DD YYYY");
</script>
