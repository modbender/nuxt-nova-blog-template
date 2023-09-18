<template>
  
</template>

<script setup>
const route = useRoute();

const [prev, next] = await queryContent("/p")
  .only(["_path", "title"])
  .sort({ added_at: -1 })
  .where({ _draft: false })
  .findSurround(route.path);

console.log(prev, next);
</script>
