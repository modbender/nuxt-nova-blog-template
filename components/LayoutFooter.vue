<template>
  <div class="mt-auto bg-body-tertiary">
    <footer class="container">
      <div
        class="d-flex flex-wrap justify-content-between align-items-center my-4"
      >
        <span class="mb-3 mb-md-0 text-body-secondary"> © 2023 Nuxt Nova </span>
        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3">
            <a
              class="text-danger"
              aria-label="Go to Youtube Link"
              :href="$config.public.shareLinks?.youtube ?? '#'"
              target="_blank"
            >
              <Icon width="24" height="24" name="mdi:youtube" />
            </a>
          </li>
          <li class="ms-3">
            <a
              class="text-info"
              aria-label="Go to X Link"
              :href="$config.public.shareLinks?.x ?? '#'"
              target="_blank"
            >
              <Icon width="24" height="24" name="mdi:twitter" />
            </a>
          </li>
          <li class="ms-3">
            <a
              aria-label="Go to Facebook Link"
              :href="$config.public.shareLinks?.facebook ?? '#'"
              target="_blank"
            >
              <Icon width="24" height="24" name="mdi:facebook" />
            </a>
          </li>
          <li class="ms-3">
            <a
              class="text-warning"
              aria-label="Go to Instagram Link"
              :href="$config.public.shareLinks?.instagram ?? '#'"
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

<script setup></script>
