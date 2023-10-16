<template>
  <div id="default-layout-container">
    <NavBar />
    <main>
      <slot />
    </main>
    <LayoutFooter />
    <NuxtLoadingIndicator />
    <ScrollUp />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

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
