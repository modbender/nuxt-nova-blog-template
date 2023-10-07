export default async () => {
  var allPosts = [];
  var pageCount = 0;

  const { find } = useStrapi();

  const getData = async (currentPage = 1) => {
    const { data } = await useAsyncData(`getall-tags-${currentPage}`, () =>
      find("tags", {
        pagination: {
          page: currentPage,
          pageSize: 1000,
        },
        fields: ["name", "slug", "description"],
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
