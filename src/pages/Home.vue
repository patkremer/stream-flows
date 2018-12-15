<template>
  <main-layout>
    <app></app>
  </main-layout>
</template>

<script>
  import App from '../App.vue';
  import MainLayout from '../layouts/Main.vue'
  export default {
    components: {
      MainLayout,
      App
    }
  }
</script>