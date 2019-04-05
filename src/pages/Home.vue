<template>

  <main-layout>
    <pre v-if="error">
      {{error}}
    </pre>
    <stream-collection></stream-collection>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";
import StreamCollection from '../components/stream/StreamCollection.vue'

export default {
  components: {
    MainLayout,
    StreamCollection
  },
  data: function() {
    return {
        error: null
      };
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
  },

};
</script>