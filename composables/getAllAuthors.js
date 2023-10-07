export default async () => {
  const { find } = useStrapi();

  const getData = async (currentPage = 1) => {
    const { data } = await useAsyncData(`getall-authors-${currentPage}`, () =>
      find("users", {
        fields: ["username"],
      })
    );

    return data;
  };

  return await getData();
};
