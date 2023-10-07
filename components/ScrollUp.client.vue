<template>
  <div
    class="position-fixed end-0 p-3 scroll-top"
    :class="{ hidden: !react.showScroller }"
  >
    <button
      type="button"
      aria-label="Scroll To Top"
      class="btn btn-primary rounded-circle"
      @click="scrollToTop"
    >
      <Icon width="25" height="35" name="mdi:transfer-up" />
    </button>
  </div>
</template>

<script setup>
const showScroller = ref(false);
const react = reactive({ showScroller });

const scrollToTop = (event) => {
  document.scrollingElement.scroll({ top: 0, left: 0, behavior: "smooth" });
};

const handleScroll = (event) => {
  react.showScroller = document.scrollingElement.scrollTop > window.innerHeight;
};

onBeforeMount(() => {
  document.addEventListener("scroll", handleScroll);
});
</script>

<style lang="scss">
.scroll-top {
  bottom: 0;
  opacity: 0.6;
  transition: opacity 0.2s linear, bottom 0.3s linear, display 0.4s linear;
  bottom: 50px;

  &:hover {
    opacity: 1;
  }
}

.hidden {
  opacity: 0;
  bottom: -100px;
  display: hidden;
}
</style>
