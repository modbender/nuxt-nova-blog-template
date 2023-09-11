<template>
  <div class="row text-center text-md-start">
    <div class="col-md-auto">
      <NuxtLink class="h3 text-decoration-none text-primary" :to="author._path">
        <NuxtImg
          preload
          width="100"
          height="100"
          quality="80"
          class="rounded-circle"
          :src="author.info?.picture"
          :alt="author.info?.name"
          v-if="!!author.info?.picture"
        />
      </NuxtLink>
    </div>

    <div class="col">
      <div class="flex flex-column">
        <NuxtLink
          class="h3 text-decoration-none text-primary"
          :to="author._path"
        >
          {{ author.info.name }}
        </NuxtLink>
      </div>
      <p v-if="!!author.info?.bio">
        {{ author.info.bio }}
      </p>
    </div>
    <div v-if="!!author.info?.share" class="row align-items-center">
      <div class="col mb-2 mb-md-0">
        <NuxtLink
          target="_blank"
          class="me-2 text-decoration-none"
          v-if="!!author.info.share.youtube"
          :to="author.info.share.youtube"
        >
          <Icon
            width="30"
            height="30"
            name="mdi:youtube"
            class="mb-1 text-danger"
          />
        </NuxtLink>
        <NuxtLink
          target="_blank"
          class="me-2 text-decoration-none"
          v-if="!!author.info.share.x"
          :to="author.info.share.x"
        >
          <Icon
            width="30"
            height="30"
            name="mdi:twitter"
            class="mb-1 text-info"
          />
        </NuxtLink>
        <NuxtLink
          target="_blank"
          class="me-2 text-decoration-none"
          v-if="!!author.info.share.facebook"
          :to="author.info.share.facebook"
        >
          <Icon class="mb-1" width="30" height="30" name="mdi:facebook-box" />
        </NuxtLink>
        <NuxtLink
          target="_blank"
          class="me-2 text-decoration-none"
          v-if="!!author.info.share.instagram"
          :to="author.info.share.instagram"
        >
          <Icon
            width="30"
            height="30"
            name="mdi:instagram"
            class="mb-1 text-warning"
          />
        </NuxtLink>
      </div>
      <div v-if="!!author.info.share.custom" class="col-md-auto">
        <NuxtLink
          target="_blank"
          class="me-2 text-decoration-none"
          v-for="(customLink, customName, i) in author.info.share.custom"
          :to="customLink"
          :key="i"
        >
          <Icon class="mb-1" name="mdi:link-variant" />
          {{ customName }}
        </NuxtLink>
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

const { author } = props;
</script>
