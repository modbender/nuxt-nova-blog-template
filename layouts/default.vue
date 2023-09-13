<template>
  <NavBar :navIndex="navIndex.pages" />
  <main>
    <slot />
  </main>
  <LayoutFooter />
  <NuxtLoadingIndicator />
  <NavSearch />
</template>

<script setup>
const { data: navIndex } = await useAsyncData("navIndex", () =>
  queryContent(`/nav`).only("pages").findOne()
);
</script>
