<template>
  <div class="row text-center text-md-start">
    <div class="col-md-auto">
      <NuxtLink
        id="identity"
        class="h3 text-decoration-none text-primary"
        :to="`/author/${author.id}`"
      >
        <NuxtImg
          preload
          width="100"
          height="100"
          quality="80"
          format="webp"
          loading="lazy"
          class="rounded-circle"
          :src="authorImage"
          :alt="author.attributes.username"
          v-if="!!authorImage"
        />
      </NuxtLink>
    </div>

    <div class="col">
      <div class="flex flex-column mb-2 mt-3 mt-md-0">
        <NuxtLink
          class="h4 text-decoration-none text-body-emphasis"
          :to="`/author/${author.id}`"
        >
          <Icon class="me-1 mb-1" name="mdi:link-variant" />
          <strong>{{ author.attributes.username }}</strong>
        </NuxtLink>
      </div>
      <p v-if="!!author.attributes.description">
        {{ author.attributes.description }}
      </p>
    </div>
    <div
      v-if="!!author.attributes.shareLinks?.id"
      class="row align-items-center"
    >
      <div class="col mb-2 mb-md-0">
        <a
          target="_blank"
          aria-label="Go to Author's Youtube Link"
          class="me-2 text-decoration-none"
          v-if="!!author.attributes.shareLinks.youtube"
          :href="author.attributes.shareLinks.youtube"
        >
          <Icon
            width="30"
            height="30"
            name="mdi:youtube"
            class="mb-1 text-danger"
          />
        </a>
        <a
          target="_blank"
          aria-label="Go to Author's X Link"
          class="me-2 text-decoration-none"
          v-if="!!author.attributes.shareLinks.x"
          :href="author.attributes.shareLinks.x"
        >
          <Icon
            width="30"
            height="30"
            name="mdi:twitter"
            class="mb-1 text-info"
          />
        </a>
        <a
          target="_blank"
          aria-label="Go to Author's Facebook Link"
          class="me-2 text-decoration-none"
          v-if="!!author.attributes.shareLinks.facebook"
          :href="author.attributes.shareLinks.facebook"
        >
          <Icon class="mb-1" width="30" height="30" name="mdi:facebook-box" />
        </a>
        <a
          target="_blank"
          aria-label="Go to Author's Instagram Link"
          class="me-2 text-decoration-none"
          v-if="!!author.attributes.shareLinks.instagram"
          :href="author.attributes.shareLinks.instagram"
        >
          <Icon
            width="30"
            height="30"
            name="mdi:instagram"
            class="mb-1 text-warning"
          />
        </a>
      </div>
      <div
        v-if="
          !!author.attributes.shareLinks.custom &&
          author.attributes.shareLinks.custom.length > 0
        "
        class="col-md-auto"
      >
        <a
          target="_blank"
          class="me-2 text-decoration-none"
          :aria-label="`Go to Author's ${customLink.name} Link`"
          v-for="customLink in author.attributes.shareLinks.custom"
          :key="customLink.id"
          :href="customLink.url"
        >
          <Icon class="mb-1" name="mdi:link-variant" />
          {{ customLink.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  author: {
    required: true,
  },
});

const { author } = toRefs(props);

const authorImage = !!unref(author).attributes.picture?.data?.id
  ? useStrapiMedia(unref(author).attributes.picture?.data.attributes.url)
  : "";
</script>
