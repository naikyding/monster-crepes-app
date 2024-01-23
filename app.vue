<script setup>
const config = useRuntimeConfig();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`API URL: ${config.public.apiUrl}`);
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
