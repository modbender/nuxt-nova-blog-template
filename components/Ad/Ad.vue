<template>
  <div v-bind="container">
    <template v-if="code === '1'">
      <Adsbygoogle />
    </template>
    <template v-else-if="code === '2'">
      <Adsbygoogle />
    </template>
    <template v-else-if="code === '3'">
      <Adsbygoogle />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  container: {
    type: Object,
    required: false,
  },
  code: {
    type: String,
    default: () => "1",
  },
  passProps: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const { container, code, passProps } = toRefs(props);
</script>
