
<script lang="ts" setup>
const counter = useCounter();
</script>

<template>
 <div class="">

  <button @click="counter++">Increment Counter</button>
  <button @click="counter--">Decrement Counter</button>
  
  <p>Counter: {{ counter }}</p>
</div>
</template>

 