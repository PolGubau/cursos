<template>
  <div class="h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden">
    <header class="bg-neutral-500/30 w-full p-4 ">
          <ul class="flex gap-4">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/catalog">Catalogs</NuxtLink></li>
            <li><NuxtLink to="/catalog/profile">Profile</NuxtLink></li>
          </ul>
      </header>

      <main class="overflow-y-auto">  
        <slot />
      </main>
    <footer class="bg-neutral-500/30 p-4 text-center">
      Pol Gubau Amores
    </footer>
  </div>
</template>
