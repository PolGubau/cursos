<script setup lang="ts">
 

const store = useCounterStore()
const { x, y } = useMouse();
// const { $sayHello } = useNuxtApp();

// $sayHello("Greetings from the Home Page!");

// const apiResponse = await $fetch("/api/query?foo=bar&baz=qux");
const { data, error,status } = await useFetch('/api/hello');
if (error.value) {
  console.error("Error en API:", error.value);
}
console.log(data.value);

 </script>

<template>
  <div>

     
    
    <h1 class="text-3xl font-bold">
      Hello World {{ store.$state.name }}
    </h1>

    <input v-model="store.$state.name" />


      <div>pos: {{ x }}, {{ y }}</div>

    <!-- <img src="@/assets/img1.png" alt="a"/> -->
    <h1>Home Page</h1>
    <p>Welcome to the home page.</p>
    <Alert>Hello</Alert>
    <Sections />
    <SectionsHero />
    
    This is too magic

 
   </div>
</template>
 