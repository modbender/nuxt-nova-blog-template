<template>
  <header class="navbar navbar-expand-lg bg-body-tertiary">
    <nav class="container-xxl bd-gutter flex-wrap flex-lg-nowrap">
      <NuxtLink class="navbar-brand" to="/">
        {{ $config.public.siteName }}
      </NuxtLink>
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
          <li class="nav-item">
            <NuxtLink
              class="nav-link"
              :class="{ active: $route.path === '/' }"
              aria-current="page"
              to="/"
            >
              HOME
            </NuxtLink>
          </li>
          <li class="nav-item" v-for="(key, value) in navIndex" :key="key">
            <NuxtLink
              class="nav-link"
              :class="{ active: $route.path === `/nav/${key}` }"
              aria-current="page"
              :to="`/nav/${key}`"
            >
              {{ value }}
            </NuxtLink>
          </li>
        </ul>
        <!-- <div class="me-2 mb-2 mb-lg-0"> Dark Mode Switch - TBD
          <select class="form-select" v-model="$colorMode.preference">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div> -->
        <ul class="navbar-nav ms-md-auto mb-2 mb-lg-0">
          <NavSearch />
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
const props = defineProps({
  navIndex: {
    required: false,
  },
});

const { navIndex } = props;
</script>
