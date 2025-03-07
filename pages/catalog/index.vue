<script setup lang="ts">

useHead({
  title: "Catalogs",
  meta: [{ name: "description", content: "Catalogs page description" }],
  bodyAttrs: {
    class: "bg-red-900",
  },
  
})
definePageMeta({
	title: "Catalogs",
	meta: [{ name: "description", content: "Catalogs page description" }],
	layout: "custom",
});
</script>


<template>
  <div>
    <h1>Catalogs</h1>
    <p>Welcome to the catalogs page where you can find various items.</p>

    
    <Counter />
    <Counter />

  </div>
</template>
