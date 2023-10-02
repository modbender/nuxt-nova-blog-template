<template>
  <NavBar />
  <main>
    <slot />
  </main>
  <LayoutFooter />
  <NuxtLoadingIndicator />
  <ScrollUp />
  <NavSearch :allPosts="allPosts" />
</template>

<script setup>
const allPosts = await getAllPosts();
</script>
