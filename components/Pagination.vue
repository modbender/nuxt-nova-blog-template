<template>
  <nav
    class="d-flex align-items-center justify-content-center"
    :class="classes"
    :aria-label="label"
  >
    <ul class="pagination">
      <template v-for="item in items">
        <template
          v-if="item.type === 'start-ellipsis' || item.type === 'end-ellipsis'"
        >
          <li class="page-item disabled">
            <button class="page-link">...</button>
          </li>
        </template>
        <template v-else-if="item.type === 'page'">
          <li class="page-item">
            <button
              class="page-link"
              :class="{
                active: item.selected,
              }"
              @click="item.onClick"
            >
              {{ item.page }}
            </button>
          </li>
        </template>
        <template v-else-if="item.type === 'previous'">
          <li class="page-item">
            <button class="page-link" @click="item.onClick">
              <Icon name="mdi:chevron-left" />
            </button>
          </li>
        </template>
        <template v-else-if="item.type === 'next'">
          <li class="page-item">
            <button class="page-link" @click="item.onClick">
              <Icon name="mdi:chevron-right" />
            </button>
          </li>
        </template>
        <template v-else>
          <li class="page-item">
            <button class="page-link" :disabled="item.disabled">
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
  count: count.value,
});
</script>
