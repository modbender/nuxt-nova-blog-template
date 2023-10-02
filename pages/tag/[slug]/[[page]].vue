<template></template>

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

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d*$/.test(route.params.page);
  },
});
</script>
