import qs from "qs";

export default defineEventHandler(async (event) => {
  var allPosts = [];
  var pageCount = 0;
  var apiUrl = `${process.env.NUXT_PUBLIC_STRAPI_URL}/api/posts`;

  const getData = async (currentPage = 1) => {
    const queryString = qs.stringify(
      {
        pagination: {
          page: currentPage,
          pageSize: 100,
        },
        populate: ["tags"],
        fields: ["title", "slug", "description"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const postList = await $fetch(`${apiUrl}?${queryString}`);

    return postList;
  };

  const initData = await getData();
  pageCount = initData.meta.pagination.pageCount;

  allPosts = allPosts.concat(initData.data);

  if (pageCount > 1) {
    for (let i = 2; i <= pageCount; i++) {
      const pageData = await getData(i);
      allPosts = allPosts.concat(pageData.data);
    }
  }

  return allPosts;
});
