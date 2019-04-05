<template>
  <div class="home">
    <main-layout>
      <pre v-if="error">
        {{error}}
      </pre>
      <stream-collection></stream-collection>
    </main-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import MainLayout from "../layouts/Main.vue";
import StreamCollection from '../components/stream/StreamCollection.vue'

export default {
  name: 'home2',
  components: {
    StreamCollection,
    MainLayout
  },
  data: function() {
    return {
        error: null
      };
  },
}
</script>
