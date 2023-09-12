<template>
  <NavBar :navIndex="navIndex.pages" />
  <main>
    <slot />
  </main>
  <LayoutFooter />
  <NuxtLoadingIndicator />
</template>

<script setup>
const { data: navIndex } = await useAsyncData("navIndex", () =>
  queryContent(`/nav`).only("pages").findOne()
);
</script>
