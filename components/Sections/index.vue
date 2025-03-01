<template>
  <div>
    <h2>Section Title</h2>
    <p>This is a section.</p>
    <button @click="handleClick">Click Me</button>
    </div>
</template>

<script>
export default {
	methods: {
		handleClick() {
			console.log("Button clicked!");
		},
	},
};
</script> 