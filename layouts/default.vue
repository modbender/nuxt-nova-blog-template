<template>
  <NavBar :navIndex="navIndex.pages" />
  <slot />
  <Footer />
</template>

<script setup>
const { data: navIndex } = await useAsyncData("navIndex", () =>
  queryContent(`/nav`).only("pages").findOne()
);
</script>
