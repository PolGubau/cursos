<script setup>
const nuxt = useNuxtApp();
console.log(nuxt);
</script>



<template>
  <div>
    Catalog ID: {{ $route.params.id }}
  </div>
</template>