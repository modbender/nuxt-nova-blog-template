export default async () => {
  var allPosts = [];
  var pageCount = 0;

  const { find } = useStrapi();

  const getData = async (currentPage = 1) => {
    const { data } = await useAsyncData(`getall-posts-${currentPage}`, () =>
      find("posts", {
        pagination: {
          page: currentPage,
          pageSize: 1000,
        },
        populate: ["featuredImage", "tags"],
        fields: ["title", "slug", "description", "createdAt"],
      })
    );

    return data;
  };

  const initData = await getData();
  pageCount = unref(initData).meta.pagination.pageCount;

  allPosts = allPosts.concat(unref(initData).data);

  if (pageCount > 1) {
    for (let i = 2; i <= pageCount; i++) {
      const pageData = await getData(i);
      allPosts = allPosts.concat(unref(pageData).data);
    }
  }

  return allPosts;
};
