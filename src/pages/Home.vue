<template>
  <main-layout>
    <app></app>
  </main-layout>
</template>

<script>
import App from "../App.vue";
import MainLayout from "../layouts/Main.vue";
export default {
  components: {
    MainLayout,
    App
  },
  mounted() {
    this.track();
  },
  methods: {
    track() {
      this.$ga.page("/");
      this.$ga.screenview({
        screenName: "home"
      });
    }
  }
};
</script>