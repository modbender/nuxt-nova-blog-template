<template>
  <div
    v-if="!!featuredImage"
    class="featured-container"
    :style="backgroundStyles"
  ></div>
  <div class="container-post mx-auto my-5 px-md-4">
    <NuxtImg
      preload
      width="600"
      quality="80"
      format="webp"
      sizes="100vw sm:340px md:600px"
      class="img-fluid w-100 d-block d-md-none mb-5"
      v-if="!!featuredImage"
      :src="featuredImageUrl"
      :alt="post.attributes.title"
    />

    <h1 class="mb-4">
      <strong>{{ post.attributes.title }}</strong>
    </h1>
    <div class="h5" v-if="!!tags && tags.length > 0">
      <span
        class="badge badge-lg text-black bg-warning p-2 me-2 mb-2"
        v-for="tag in tags"
        :key="tag"
      >
        {{ tag.attributes.name }}
      </span>
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
    </div>
    <template v-if="post.attributes.share !== false">
      <hr class="mt-5 mb-2" />
      <PostShare :title="post.title" />
      <hr class="mb-5 mt-2" />
    </template>
    <hr v-else class="my-5 mt-2" />
    <div class="markdown-body">
      <MDC :value="post.attributes.content" tag="article" />
    </div>
    <template v-if="post.attributes.share !== false">
      <hr class="mt-5 mb-2" />
      <PostShare :title="post.title" />
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
  <div v-if="post.comments !== false" class="container">
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
        tags: "*",
        featuredImage: "*",
        author: {
          fields: ["id", "username", "description", "shareLinks"],
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
    featuredImageUrl ?? config.public.postFeaturedImagePlaceholder,
    { preload: true, height: 700, quality: 90, format: "webp" }
  );
  return { backgroundImage: `url('${imgUrl}')` };
});

const metaData = {
  title: post.attributes.title,
  description: post.attributes.description ?? config.public.siteDescription,
  twitterCard: "summary_large_image",

  articlePublishedTime: post.attributes.createdAt,
  articleModifiedTime: post.attributes.updatedAt,

  articleTag:
    tags?.length > 0
      ? tags.map(function (tag) {
          return tag["attributes"]["name"];
        })
      : [],
};

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

useSeoMeta({
  ...metaData,
  ...imageMetaData,
  ...authorMetaData,
});
</script>
