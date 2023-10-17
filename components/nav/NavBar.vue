<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <NuxtLink class="navbar-brand" id="logo" to="/">
        {{ $config.public.site.name }}
      </NuxtLink>
      <div
        class="d-flex d-lg-none flex-row justify-content-center ms-auto me-2"
      >
        <NuxtLink class="nav-link p-2" aria-label="Go To Search" to="/search">
          <Icon width="30" height="30" name="mdi:magnify" class="mb-md-1" />
        </NuxtLink>
        <button
          class="nav-link p-2"
          @click="toggleColorMode"
          aria-label="Toggle Dark Mode"
        >
          <Icon
            width="30"
            height="30"
            :name="currentModeIcon"
            class="mb-md-1"
          />
        </button>
      </div>
      <button
        type="button"
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-label="Toggle navbar"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li
            class="nav-item"
            :class="{ active: $route.path === listPage.link }"
            v-for="listPage in listingPages"
            :key="listPage.name"
          >
            <a class="nav-link" :href="listPage.link">
              {{ listPage.name }}
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ms-md-auto d-none d-lg-flex mb-lg-0">
          <li class="nav-item">
            <NuxtLink
              class="nav-link p-2"
              aria-label="Go To Search"
              to="/search"
            >
              <Icon width="30" height="30" name="mdi:magnify" class="mb-md-1" />
            </NuxtLink>
          </li>
          <li class="nav-item">
            <button
              aria-label="Toggle Dark Mode"
              class="nav-link py-2 px-0 px-lg-2"
              @click="toggleColorMode"
            >
              <Icon
                width="25"
                height="25"
                :name="currentModeIcon"
                class="mb-md-1"
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const colorMode = useColorMode();

const colorModeIcons = {
  system: "mdi:theme-light-dark",
  light: "mdi:white-balance-sunny",
  dark: "mdi:weather-night",
};

const currentModeIcon = computed(() => colorModeIcons[colorMode.preference]);

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

const listingPages = ref([
  { name: "Posts", link: "/list/posts" },
  { name: "Authors", link: "/list/authors" },
  { name: "Tags", link: "/list/tags" },
]);
</script>
