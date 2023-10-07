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

const formattedDate = useTimeAgo(new Date(unref(dt)));

const prettyDate = useDateFormat(new Date(unref(dt)), "MMMM DD YYYY");
</script>
