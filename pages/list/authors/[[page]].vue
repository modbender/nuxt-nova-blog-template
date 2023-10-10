<template>
  <div class="container mx-auto my-5 px-4">
    <h1 class="h2 border-bottom pb-3 mb-3">Author List</h1>
    <nav aria-label="breadcrumb" id="breadcrumb">
      <ol class="breadcrumb">
        <li
          class="breadcrumb-item"
          :class="{ active: $route.path === breadcrumb.item }"
          v-for="breadcrumb in breadcrumbItems"
          :key="breadcrumb.name"
        >
          <strong v-if="$route.path === breadcrumb.item">
            {{ breadcrumb.name }}
          </strong>
          <NuxtLink v-else class="text-decoration-none" :to="breadcrumb.item">
            {{ breadcrumb.name }}
          </NuxtLink>
        </li>
      </ol>
    </nav>
    <hr />
    <div class="row">
      <div
        v-if="!!authorList && authorList.length > 0"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="author in authorList"
        :key="author.id"
      >
        <NuxtLink
          class="card author-box rainbow-elements text-center text-decoration-none w-100 h-100"
          :to="`/author/${author.id}`"
        >
          <NuxtImg
            sizes="100vw xs:217px sm:140px md:174px lg:208px"
            class="card-img-top rounded-circle w-75 mx-auto mt-3"
            :src="useStrapiMedia(author.picture.url)"
            :alt="author.username"
          />
          <div class="card-body">
            <strong class="card-title h4">{{ author.username }}</strong>
            <template v-if="!!author.description">
              <hr class="my-2" />
              <p class="card-text">
                {{ author.description }}
              </p>
            </template>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { find } = useStrapi();

const currentPage = computed(() => route.params?.page || 1);

const { data: authorList } = await useAsyncData(
  `author-list-${unref(currentPage)}`,
  () =>
    find("users", {
      pagination: {
        page: unref(currentPage),
        pageSize: 12,
      },
      fields: ["username", "description"],
      sort: ["username:asc"],
      populate: ["picture"],
    })
);

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Author List", item: "/list/authors" },
];

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: breadcrumbItems,
  }),
]);

useSeoMeta({
  title: "Author List",
  description: "List of authors to discover the best writers",
  twitterCard: "summary_large_image",
});

definePageMeta({
  name: "AuthorList",
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d*$/.test(route.params.page);
  },
});
</script>
