<template>
  <div class="mt-auto bg-body-tertiary">
    <footer class="container">
      <ul class="nav justify-content-center my-2">
        <li v-for="infoPage in infoPages" class="nav-item" :key="infoPage.name">
          <NuxtLink
            :prefetch="false"
            active-class="active"
            class="nav-link text-body-secondary"
            :aria-current="
              $route.path.indexOf(infoPage.link) !== -1 ? 'page' : null
            "
            :to="infoPage.link"
          >
            {{ infoPage.name }}
          </NuxtLink>
        </li>
      </ul>
      <hr />
      <div
        class="d-flex flex-wrap justify-content-between align-items-center my-4"
      >
        <span class="mb-3 mb-md-0 text-body-secondary" id="website">
          © 2023 {{ $config.public.site.name }}
        </span>
        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3" v-if="$config.public.socialLinks?.youtube">
            <a
              class="text-danger"
              aria-label="Go to Youtube Link"
              :href="$config.public.socialLinks?.youtube ?? '#'"
              target="_blank"
            >
              <Icon width="24" height="24" name="mdi:youtube" />
            </a>
          </li>
          <li class="ms-3" v-if="$config.public.socialLinks?.x">
            <a
              class="text-info"
              aria-label="Go to X Link"
              :href="$config.public.socialLinks?.x ?? '#'"
              target="_blank"
            >
              <Icon width="24" height="24" name="mdi:twitter" />
            </a>
          </li>
          <li class="ms-3" v-if="$config.public.socialLinks?.facebook">
            <a
              aria-label="Go to Facebook Link"
              :href="$config.public.socialLinks?.facebook ?? '#'"
              target="_blank"
            >
              <Icon width="24" height="24" name="mdi:facebook" />
            </a>
          </li>
          <li class="ms-3" v-if="$config.public.socialLinks?.instagram">
            <a
              class="text-warning"
              aria-label="Go to Instagram Link"
              :href="$config.public.socialLinks?.instagram ?? '#'"
              target="_blank"
            >
              <Icon width="24" height="24" name="mdi:instagram" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
const infoPages = ref([
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Terms & Conditions",
    link: "/term",
  },
  {
    name: "Privacy Policy",
    link: "/privacy",
  },
]);
</script>
