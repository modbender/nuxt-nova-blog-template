<template>
  <button class="btn" role="search">
    <Icon
      name="mdi:magnify"
      data-bs-target="#searchModal"
      data-bs-toggle="modal"
    />
    Search
  </button>
  <div
    class="modal fade"
    id="searchModal"
    aria-hidden="true"
    aria-labelledby="searchModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          Search
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            placeholder="Type here..."
            aria-label="Search"
            aria-describedby="basic-search"
            v-model="react.searchText"
          />
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const initSearch = ref(false);
const searchText = ref("");

const react = reactive({ initSearch, searchText, searchPosts: null });

watch(searchText, async () => {
  if (react.initSearch === true) {
    const data = await queryContent("p")
      .where({ title: { $in: [react.searchText] } })
      .find();

    console.log(react.searchText);
    console.log(data);

    react.searchPosts = data;
  } else {
    react.initSearch = true;
  }
});
</script>
