<template>
  <li class="sidenav-close" v-bind:class="{ active: isActive }">
    <v-link v-bind:href="href">
      <slot></slot>
    </v-link>
  </li>
</template>

<script>

import VLink from './VLink.vue'
export default {
  name: 'nav-link',
  props: {
    href: {
      type: String,
      required: true
    }
  },
  components: {
    VLink
  },
  computed: {
    isActive() {
      return true;// this.href === this.$root.currentRoute;
    }
  },
  
};
</script>

<style scoped>
/* .active {
  color: cornflowerblue;
} */
</style>