<template>
  <div class="bg-gray-100 p-4">
    <h1 class="text-2xl font-bold">Hero Section</h1>
    <p class="mt-2 text-gray-700">This is the hero section of the page.</p>
    <button @click="handleClick" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
      Click Me
    </button>
  </div>
</template>
<script>
export default {
	methods: {
		handleClick() {
			alert("Button clicked!");
		},
	},
};
</script>