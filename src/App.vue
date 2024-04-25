<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="flex justify-center">
    <nav class="my-8 space-x-4 text-2xl">
      <RouterLink
        to="/"
        class="font-semibold text-gray-300"
        :class="{ 'text-black underline underline-offset-8': $route.path === '/' }"
        >Visa</RouterLink
      >
      <RouterLink
        to="/edit"
        class="font-semibold text-gray-300"
        :class="{ 'text-black underline underline-offset-8': $route.path === '/edit' }"
        >Editera</RouterLink
      >
    </nav>
  </header>
  <RouterView />
</template>
