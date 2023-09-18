---
title: "Disqus for Nuxt 3"
description: "Instantly add Disqus Comments to your posts or pages using this package designed to work perfectly with Nuxt 3."
featuredImage: "/images/posts/Nuxt3.jpg"
added_at: "2023-09-10T05:35:07.322Z"
modified_at: "2023-09-10T05:35:07.322Z"
author: tim
comments: true
share: true
tags:
  - Comments
  - Disqus
  - Nuxt 3
---

Instantly add Disqus Comments to your posts or pages using this package designed to work perfectly with Nuxt 3.

Nuxt Disqus provides a wrapper for [vue3-disqus](https://github.com/modbender/vue3-disqus) to be used with Nuxt 3

## Features

- 🔆Easy to integrate
- ⚡️Instantly usable components `DisqusComments` and `DisqusCount`

## Quick Setup

1. Add `nuxt-disqus` dependency to your project

   ```bash
   # Using pnpm
   pnpm add -D nuxt-disqus

   # Using yarn
   yarn add --dev nuxt-disqus

   # Using npm
   npm install --save-dev nuxt-disqus
   ```

2. Add `nuxt-disqus` to the `modules` section of `nuxt.config.ts`

   ```js
   export default defineNuxtConfig({
     modules: ["nuxt-disqus"],
     disqus: {
       shortname: "your-disqus-shortname",
     },
   });
   ```

3. Place `DisqusComments` anywhere in your app to render Disqus Comment thread for particular `identifier`

   ```jsx
   <DisqusComments identifier="/blog/1" />
   ```

4. Place `DisqusCount` anywhere in your app to render Disqus Comment Count for particular `identifier`

   ```jsx
   <DisqusCount identifier="/blog/1" />
   ```

   Example Output for `DisqusCount` will be:

   ```xml
   99 Comments
   ```

That's it! You can now use Disqus in your Nuxt app ✨

## Development

```bash
# Install dependencies
yarn install

# Generate type stubs
yarn run dev:prepare

# Develop with the playground
yarn run dev

# Build the playground
yarn run dev:build

# Run ESLint
yarn run lint

# Run Vitest
yarn run test
yarn run test:watch

# Release new version
yarn run release
```