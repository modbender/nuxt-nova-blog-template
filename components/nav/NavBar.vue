<template>
  <header class="navbar navbar-expand-lg bg-body-tertiary">
    <nav class="container-xxl bd-gutter flex-wrap flex-lg-nowrap">
      <NuxtLink class="navbar-brand" to="/">
        {{ $config.public.site.name }}
      </NuxtLink>
      <div
        class="d-flex d-md-none flex-row justify-content-center ms-auto me-2"
      >
        <button
          aria-label="Open Search Box"
          class="nav-link p-2"
          data-bs-target="#searchModal"
          data-bs-toggle="modal"
        >
          <Icon width="30" height="30" name="mdi:magnify" class="mb-md-1" />
        </button>
        <button
          aria-label="Toggle Dark Mode"
          class="nav-link p-2"
          @click="toggleColorMode"
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
        aria-expanded="false"
        aria-label="Toggle navbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li
            class="nav-item"
            v-for="listPage in listingPages"
            :key="listPage.name"
          >
            <NuxtLink
              class="nav-link"
              active-class="active"
              :aria-current="$route.path === listPage.link ? 'page' : null"
              :to="listPage.link"
            >
              {{ listPage.name }}
            </NuxtLink>
          </li>
        </ul>
        <ul class="navbar-nav ms-md-auto d-none d-md-flex mb-lg-0">
          <li class="nav-item">
            <button
              aria-label="Open Search Box"
              class="nav-link py-2 px-0 px-lg-2"
              data-bs-target="#searchModal"
              data-bs-toggle="modal"
            >
              <Icon width="25" height="25" name="mdi:magnify" class="mb-md-1" />
            </button>
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
    </nav>
  </header>
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

const listingPages = [
  { name: "Posts", link: "/list/posts" },
  { name: "Authors", link: "/list/authors" },
  { name: "Tags", link: "/list/tags" },
];
</script>
