<template>
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
            role="search"
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
              class="list-group-item list-group-item-action"
              :class="`list-group-item-${randomColorClass}`"
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
</template>

<script setup>
const initSearch = ref(false);
const searchText = ref("");

const react = reactive({ initSearch, searchText, searchPosts: null });

const colorClasses = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
];

const randomColorClass = computed(
  () => colorClasses[Math.floor(Math.random() * colorClasses.length)]
);

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
