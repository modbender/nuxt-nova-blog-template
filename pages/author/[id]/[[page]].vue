<template>
  <div
    v-if="!!backgroundStyles"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-4">
    <hr />
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
    <hr class="mb-5" />
    <div class="text-center">
      <NuxtImg
        preload
        width="250"
        height="250"
        quality="80"
        format="webp"
        class="rounded-circle"
        v-if="!!pictureUrl"
        :src="pictureUrl"
        :alt="author.username"
      />
      <h1 class="mt-3">
        <strong>{{ author.username }}</strong>
      </h1>
      <template v-if="!!Object.keys(author.shareLinks).length > 0">
        <hr class="mt-4 mt-2" />
        <div>
          <div class="mb-2">
            <a
              target="_blank"
              aria-label="Go to Author's Youtube Link"
              class="me-2 text-decoration-none"
              v-if="!!author.shareLinks.youtube"
              :href="author.shareLinks.youtube"
            >
              <Icon
                width="35"
                height="35"
                name="mdi:youtube"
                class="mb-1 text-danger"
              />
            </a>
            <a
              target="_blank"
              aria-label="Go to Author's X Link"
              class="me-2 text-decoration-none"
              v-if="!!author.shareLinks.x"
              :href="author.shareLinks.x"
            >
              <Icon
                width="35"
                height="35"
                name="mdi:twitter"
                class="mb-1 text-info"
              />
            </a>
            <a
              target="_blank"
              aria-label="Go to Author's Facebook Link"
              class="me-2 text-decoration-none"
              v-if="!!author.shareLinks.facebook"
              :href="author.shareLinks.facebook"
            >
              <Icon
                class="mb-1"
                width="35"
                height="35"
                name="mdi:facebook-box"
              />
            </a>
            <a
              target="_blank"
              aria-label="Go to Author's Instagram Link"
              class="me-2 text-decoration-none"
              v-if="!!author.shareLinks.instagram"
              :href="author.shareLinks.instagram"
            >
              <Icon
                width="35"
                height="35"
                name="mdi:instagram"
                class="mb-1 text-warning"
              />
            </a>
          </div>
          <div v-if="!!author.shareLinks.custom">
            <a
              target="_blank"
              class="me-2 text-decoration-none"
              :aria-label="`Go to Author's ${customLink.name} Link`"
              v-for="customLink in author.shareLinks.custom"
              :href="customLink.url"
              :key="customLink.id"
            >
              <Icon class="mb-1" name="mdi:link-variant" />
              {{ customLink.name }}
            </a>
          </div>
        </div>
      </template>
    </div>
    <hr class="mb-4 mt-2" />
    <div class="markdown-body">
      <MDC :value="author.content" tag="article" />
    </div>
    <hr class="mt-4" :class="{ 'mb-5': !(author.share !== false) }" />
    <template v-if="author.share !== false">
      <PostShare :title="author.name" />
      <hr class="mb-4 mb-2" />
    </template>
  </div>
  <div class="container mb-5">
    <h2 class="text-center mt-5 mb-3">Posts by this Author</h2>
    <div v-if="!!authorPosts?.data && authorPosts.data.length > 0" class="row">
      <div
        class="col-12 col-md-6 col-lg-4 my-2"
        v-for="post in authorPosts.data"
        :key="post"
      >
        <PostBoxGrid :post="post" />
      </div>
      <div class="mt-5 d-flex flex-column">
        <Pagination :count="authorPosts.meta.pagination.pageCount" />
      </div>
    </div>
    <div v-else class="p-5 text-center display-6">No posts yet</div>
  </div>
</template>

<script setup>
const img = useImage();
const route = useRoute();
const { find, findOne } = useStrapi();

const currentPage = computed(() => route.params?.page || 1);

const { data: author } = await useAsyncData(`author-${route.params.id}`, () =>
  findOne("users", route.params.id, {
    populate: {
      picture: "*",
      coverImage: "*",
      shareLinks: {
        populate: "*",
      },
    },
    fields: ["username", "content", "description", "createdAt"],
  })
);

const { data: authorPosts } = await useAsyncData(
  `author-posts-${route.params.id}-${unref(currentPage)}`,
  () =>
    find("posts", {
      filters: {
        author: {
          id: {
            $eq: route.params.id,
          },
        },
      },
      pagination: {
        page: unref(currentPage),
        pageSize: 6,
      },
      populate: ["featuredImage", "tags"],
      sort: ["createdAt:desc"],
    })
);

const picture = unref(author).picture;
const pictureUrl = !!picture ? useStrapiMedia(picture.url) : null;
const pictureOgImageData = useStrapiOgImage(unref(author).username, picture);

const coverImage = unref(author).coverImage;
const coverImageUrl = !!coverImage ? useStrapiMedia(picture.url) : null;

const backgroundStyles = computed(() => {
  if (!coverImageUrl && !pictureUrl) return null;

  const imgUrl = img(coverImageUrl ?? pictureUrl, {
    preload: true,
    format: "webp",
    height: 700,
  });
  return { backgroundImage: `url('${imgUrl}')` };
});

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Author List", item: "/list/authors" },
  { name: unref(author).username, item: route.path },
];

const imageMetaData =
  pictureOgImageData.length > 0
    ? {
        ogImage: pictureOgImageData,
      }
    : {};

const metaData = {
  title: `${unref(author).username} | Author`,
  description:
    unref(author).description ||
    unref(author).content ||
    unref(author).username,
  twitterCard: "summary_large_image",

  ...imageMetaData,
};

useSchemaOrg([
  definePerson({
    name: unref(author).username,
    description:
      unref(author).description ||
      unref(author).content ||
      unref(author).username,
    url: `/author/${unref(author).id}`,
    ...(!!pictureOgImageData.length > 0
      ? {
          image: pictureOgImageData[0].url,
        }
      : {}),
  }),
  defineBreadcrumb({
    itemListElement: breadcrumbItems,
  }),
]);

useSeoMeta(metaData);

definePageMeta({
  scrollToTop: false,
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id) && /^\d*$/.test(route.params.page);
  },
});
</script>
