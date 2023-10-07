<template>
  <div class="row mx-0 mx-md-5">
    <div class="col text-center">
      <div class="dropdown">
        <button
          type="button"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Icon name="mdi:share-variant" class="mx-1" />
          Share
        </button>
        <ClientOnly>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" @click="copyLink" href="#">
                <Icon name="mdi:content-copy" />
                Copy Link
              </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a
                class="dropdown-item"
                :href="`https://twitter.com/share?url=${urlNoQuery}&text=${title}`"
              >
                <Icon name="mdi:twitter" />
                Tweet
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                :href="`https://www.facebook.com/sharer/sharer.php?u=${urlNoQuery}`"
              >
                <Icon name="mdi:facebook" />
                Facebook
              </a>
            </li>
          </ul>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
const url = useRequestURL();

const props = defineProps({
  title: {
    required: true,
  },
});

const { title } = toRefs(props);

const urlNoQuery = url.href.replace(url.search, "");

const copyLink = () => {
  navigator.clipboard.writeText(urlNoQuery);
};
</script>
