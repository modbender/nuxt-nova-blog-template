<template>
  <div class="mt-auto bg-body-tertiary">
    <footer class="container">
      <div
        class="d-flex flex-wrap justify-content-between align-items-center my-4"
      >
        <span class="mb-3 mb-md-0 text-body-secondary"> © 2023 Nuxt Nova </span>
        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3">
            <NuxtLink
              class="text-danger"
              target="_blank"
              :href="$config.public.shareLinks?.youtube ?? '#'"
            >
              <Icon width="24" height="24" name="mdi:youtube" />
            </NuxtLink>
          </li>
          <li class="ms-3">
            <NuxtLink
              class="text-info"
              target="_blank"
              :href="$config.public.shareLinks?.x ?? '#'"
            >
              <Icon width="24" height="24" name="mdi:twitter" />
            </NuxtLink>
          </li>
          <li class="ms-3">
            <NuxtLink
              target="_blank"
              :href="$config.public.shareLinks?.facebook ?? '#'"
            >
              <Icon width="24" height="24" name="mdi:facebook" />
            </NuxtLink>
          </li>
          <li class="ms-3">
            <NuxtLink
              class="text-warning"
              target="_blank"
              :href="$config.public.shareLinks?.instagram ?? '#'"
            >
              <Icon width="24" height="24" name="mdi:instagram" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup></script>
