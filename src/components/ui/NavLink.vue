<template>
  <li class="sidenav-close" v-bind:class="{ active: isActive }">
    <v-link v-bind:href="href">
      <slot></slot>
    </v-link>
  </li>
</template>

<script>
import routes from "../../routes";
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
      return this.href === this.$root.currentRoute;
    }
  },
  methods: {
    go(event) {
      event.preventDefault();
    
      this.$root.currentRoute = this.href;
      window.history.pushState(null, routes[this.href], this.href);
    }
  }
};
</script>

<style scoped>
/* .active {
  color: cornflowerblue;
} */
</style>