<template>
  <li class="nav-item">
    <button
      aria-label="Open Search Box"
      class="nav-link py-2 px-0 px-lg-2"
      data-bs-target="#searchModal"
      data-bs-toggle="modal"
      role="search"
    >
      <Icon width="20px" height="20px" name="mdi:magnify" class="mb-md-1" />
      Search
    </button>
  </li>
  <ClientOnly>
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
            <strong>Search</strong>
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
          <div class="modal-body">
            <div v-if="searchText !== ''" class="list-group border">
              <NuxtLink
                v-for="post in react.searchPosts"
                :to="post._path"
                class="list-group-item list-group-item-action list-group-item-primary"
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ post.title }}</h5>
                  <small>
                    <TimeAgo :dt="post.added_at" />
                  </small>
                </div>
                <p class="mb-1 text-truncate">{{ post.description }}</p>
                <small class="text-truncate">
                  <template v-for="(tag, i) in post.tags" :key="tag">
                    {{ tag }}
                    <template v-if="i !== post.tags.length - 1">, </template>
                  </template>
                </small>
              </NuxtLink>
            </div>
            <div v-else class="text-center border py-5">
              <strong class="text-secondary">Type something to search!</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const initSearch = ref(false);
const searchText = ref("");

const react = reactive({ initSearch, searchText, searchPosts: null });

watch(searchText, async () => {
  if (react.initSearch === true) {
    const data = await queryContent("p")
      .where({ title: { $regex: `/${react.searchText}/ig` } })
      .only(["title", "description", "added_at", "tags", "_path"])
      .find();

    react.searchPosts = data;
  } else {
    react.initSearch = true;
  }
});
</script>
