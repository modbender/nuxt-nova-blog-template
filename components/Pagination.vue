<template>
  <nav
    class="d-flex align-items-center justify-content-center"
    :class="classes"
    :aria-label="label"
  >
    <ul class="pagination">
      <template v-for="item in items" :key="item">
        <template
          v-if="item.type === 'start-ellipsis' || item.type === 'end-ellipsis'"
        >
          <li class="page-item disabled">
            <button aria-label="Page Ellipsis" class="page-link">...</button>
          </li>
        </template>
        <template v-else-if="item.type === 'page'">
          <li class="page-item">
            <NuxtLink
              class="page-link"
              :aria-label="`Go To Page ${item.page}`"
              :class="{
                active: item.selected,
              }"
              :to="{ params: { page: item.page } }"
              @click="item.onClick"
            >
              {{ item.page }}
            </NuxtLink>
          </li>
        </template>
        <template v-else-if="item.type === 'previous'">
          <li class="page-item">
            <NuxtLink
              class="page-link"
              aria-label="Previous Page"
              :to="{ params: { page: item.page } }"
              @click="item.onClick"
              v-if="item.page >= 1"
            >
              <Icon name="mdi:chevron-left" />
            </NuxtLink>
            <button
              v-else
              class="page-link disabled"
              aria-label="Disabled Previous Page"
              :disabled="true"
            >
              <Icon name="mdi:chevron-left" />
            </button>
          </li>
        </template>
        <template v-else-if="item.type === 'next'">
          <li class="page-item">
            <NuxtLink
              class="page-link"
              aria-label="Next Page"
              :to="{ params: { page: item.page } }"
              @click="item.onClick"
              v-if="item.page <= count"
            >
              <Icon name="mdi:chevron-right" />
            </NuxtLink>
            <button
              v-else
              class="page-link disabled"
              aria-label="Disabled Next Page"
              :disabled="true"
            >
              <Icon name="mdi:chevron-right" />
            </button>
          </li>
        </template>
        <template v-else>
          <li class="page-item">
            <button
              class="page-link"
              :disabled="item.disabled"
              aria-label="Disabled Page"
            >
              {{ item.type }}
            </button>
          </li>
        </template>
      </template>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Page navigation",
  },
  count: {
    required: true,
  },
  classes: {
    required: false,
  },
});

const { label, count, classes } = toRefs(props);

const items = usePagination({
  count: unref(count),
});
</script>
