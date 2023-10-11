<template>
  <NavBar />
  <main>
    <slot />
  </main>
  <LayoutFooter />
  <NuxtLoadingIndicator />
  <ScrollUp />
  <LazyNavSearch :allPosts="allPosts" />
</template>

<script setup>
const config = useRuntimeConfig();

const allPosts = await getAllPosts();

useSchemaOrg([
  defineOrganization({
    name: config.public.site.name,
    logo: config.public.favicon,
  }),
  defineWebSite({
    potentialAction: [
      defineSearchAction({
        target: "/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      }),
    ],
  }),
]);
</script>
