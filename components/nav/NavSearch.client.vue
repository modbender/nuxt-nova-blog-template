<template>
  <div
    class="modal modal-lg fade"
    id="searchModal"
    aria-hidden="true"
    aria-labelledby="searchModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <strong>Search</strong>
          <a class="ms-2" target="_blank" href="/search">
            <Icon name="mdi:launch" width="20" height="20" />
          </a>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close Search Box"
          ></button>
        </div>
        <div class="modal-body">
          <form class="form-inline" method="GET" action="/search">
            <input
              name="title"
              type="search"
              role="search"
              class="form-control"
              v-model="react.searchText"
              placeholder="Type here..."
              aria-describedby="basic-search"
              aria-label="Search"
            />
          </form>
        </div>
        <div class="modal-body">
          <div
            v-if="searchText !== '' && searchText.length > 2"
            class="list-group border"
          >
            <template v-if="!!react.searchPosts?.length > 0">
              <NuxtLink
                v-for="post in react.searchPosts"
                :to="`/p/${post.attributes.slug}`"
                class="list-group-item list-group-item-action"
                :class="`list-group-item-${randomColorClass}`"
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ post.attributes.title }}</h5>
                  <small>
                    <TimeAgo :dt="post.attributes.added_at" />
                  </small>
                </div>
                <p class="mb-1 text-truncate">
                  {{ post.attributes.description }}
                </p>
                <small class="text-truncate">
                  <template
                    v-for="(tag, i) in post.attributes.tags?.data"
                    :key="tag.id"
                  >
                    {{ tag.attributes.name }}
                    <template
                      v-if="i !== post.attributes.tags?.data.length - 1"
                    >
                      {{ ", " }}
                    </template>
                  </template>
                </small>
              </NuxtLink>
            </template>
            <div v-else class="p-5 text-center display-6">No results found</div>
          </div>
          <div
            v-if="searchText.length < 3"
            class="p-5 text-center d-flex flex-column"
          >
            <strong class="display-6">Type to search</strong>
            <small>Min 3 characters</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const initSearch = ref(false);
const searchText = ref("");
const searchPosts = ref([]);

const props = defineProps({
  allPosts: {
    required: true,
  },
});

const { allPosts } = toRefs(props);

const react = reactive({ initSearch, searchText, searchPosts });

const colorClasses = ["primary", "success", "danger", "warning", "info"];

const randomColorClass = computed(
  () => colorClasses[Math.floor(Math.random() * colorClasses.length)]
);

watch(searchText, async (newSearchText) => {
  if (react.initSearch === true) {
    const data = unref(allPosts).filter(function (post) {
      const title = post.attributes.title.toString();
      const newRegex = new RegExp(newSearchText, "gi");
      return title.match(newRegex) != null;
    });
    react.searchPosts = data;
  } else {
    react.initSearch = true;
  }
});
</script>
