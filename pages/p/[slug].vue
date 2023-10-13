<template>
  <div
    v-if="!!featuredImage"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <NuxtImg
    preload
    quality="80"
    format="webp"
    :width="featuredImage.attributes.width"
    :height="featuredImage.attributes.height"
    class="img-fluid w-100 d-block d-md-none mb-5"
    :alt="post.attributes.title"
    :src="featuredImageUrl"
    v-if="!!featuredImage"
  />
  <div class="container-post mx-auto my-5 px-md-4">
    <h1 class="mb-4">
      <strong>{{ post.attributes.title }}</strong>
    </h1>
    <div class="h5" v-if="!!tags && tags.length > 0">
      <NuxtLink
        :to="`/tag/${tag.attributes.slug}`"
        class="badge text-black text-decoration-none bg-warning p-2 me-2 mb-2"
        v-for="tag in tags"
        :key="tag"
      >
        {{ tag.attributes.name }}
      </NuxtLink>
    </div>
    <div class="row">
      <div class="col text-secondary-emphasis">
        <strong v-if="post.attributes.createdAt === post.attributes.updatedAt">
          <TimeAgo :dt="post.attributes.createdAt" :pretty="true" />
        </strong>
        <strong v-else>
          Updated on
          <TimeAgo :dt="post.attributes.updatedAt" :pretty="true" />
        </strong>
      </div>
      <div
        class="col-auto text-secondary-emphasis"
        v-if="!!post.attributes.readingTime"
      >
        <strong>{{ post.attributes.readingTime }}</strong>
      </div>
    </div>
    <template v-if="post.attributes.share !== false">
      <hr class="mt-5 mb-2" />
      <PostShare :title="post.attributes.title" />
      <hr class="mb-5 mt-2" />
    </template>
    <hr v-else class="my-5 mt-2" />
    <MDC
      id="article"
      tag="article"
      class="markdown-body"
      :value="post.attributes.content"
    />
    <template v-if="post.attributes.showAuthor !== false">
      <hr class="mt-5 mb-2" />
      <PostShare :title="post.attributes.title" />
    </template>
    <template v-if="!!authorData?.id && post.attributes.showAuthor === true">
      <hr
        class="mb-2"
        :class="{
          'mt-2': post.attributes.share !== false,
          'mt-5': !(post.attributes.share !== false),
        }"
      />
      <PostAuthorInfo :author="authorData" />
    </template>
    <hr class="mb-5 mt-2" />
    <RelatedPosts :post="post" />
  </div>
  <Ad :container="{ class: 'ad-slot' }" code="1" />
  <div v-if="post.comments !== false" class="container mb-5">
    <DisqusComments :identifier="url.pathname" />
  </div>
</template>

<script setup>
const img = useImage();
const route = useRoute();
const url = useRequestURL();
const config = useRuntimeConfig();
const { find } = useStrapi();

const { data: postListData } = await useAsyncData(
  `post-${route.params.slug}`,
  () =>
    find("posts", {
      populate: {
        tags: {
          fields: ["name", "slug"],
        },
        featuredImage: "*",
        author: {
          fields: ["username", "description", "shareLinks"],
          populate: {
            picture: "*",
            shareLinks: {
              populate: "*",
            },
          },
        },
      },
      filters: {
        slug: {
          $eq: route.params.slug,
        },
      },
    })
);

const { data: postList } = unref(postListData);

if (postList.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "Post Not Found" });
}

const post = postList[0];

const tags = post.attributes.tags?.data;
const featuredImage = post.attributes.featuredImage?.data;
const featuredImageUrl = !!featuredImage
  ? useStrapiMedia(featuredImage.attributes.url)
  : null;
const featuredOgImageData = useStrapiOgImage(
  post.attributes.title,
  featuredImage
);

const authorData = post.attributes.author?.data;

const backgroundStyles = computed(() => {
  const imgUrl = img(
    featuredImageUrl ?? config.public.featuredImagePlaceholder,
    {
      height: 700,
      format: "webp",
      quality: 90,
    }
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

const imageMetaData =
  featuredOgImageData.length > 0
    ? {
        ogImage: featuredOgImageData,
      }
    : {};

const authorMetaData =
  !!authorData && !!authorData.id
    ? {
        articleAuthor: authorData.username,
      }
    : {};

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Post List", item: "/list/posts" },
  { name: post.attributes.title, item: route.path },
];

const metaData = {
  title: post.attributes.title,
  description: post.attributes.description ?? config.public.site.description,
  twitterCard: "summary_large_image",

  articlePublishedTime: post.attributes.createdAt,
  articleModifiedTime: post.attributes.updatedAt,

  ...imageMetaData,
  ...authorMetaData,
};

useSchemaOrg([
  defineArticle({
    headline: metaData.title,
    description: metaData.description,
    dateModified: metaData.articleModifiedTime,
    datePublished: metaData.articlePublishedTime,
    ...(featuredOgImageData.length > 0
      ? {
          image: featuredOgImageData[0].url,
        }
      : {}),
    ...(!!authorData && !!authorData.id
      ? {
          name: authorData.username,
          url: `/author/${authorData.id}`,
        }
      : {}),
  }),
  defineBreadcrumb({
    itemListElement: breadcrumbItems,
  }),
]);

useSeoMeta(metaData);
</script>
