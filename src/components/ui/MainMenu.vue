<template>
  <div id="mainMenu">
    <ul id="slide-out" class="sidenav">
      <li class="sidenav-close">
        <div class="user-view">
          <v-link href="/">
            <app-icon></app-icon>
          </v-link>
        </div>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <nav-link href="/">
        <i class="material-icons left">home</i> Home
      </nav-link>
      <nav-link href="/charts">
        <i class="material-icons left">bar_chart</i>Charts
      </nav-link>

      <nav-link href="/about">
        <i class="material-icons left">info</i>About
      </nav-link>
    </ul>
    <a
      href="#"
      data-target="slide-out"
      class="sidenav-trigger btn-flat btn grey-text text-darken-4"
    >
      <i class="material-icons">menu</i>
    </a>
  </div>
</template>

<script>
import NavLink from "./NavLink.vue";
import VLink from "./VLink.vue";
import AppIcon from "./AppIcon.vue";

export default {
  name: "main-menu",
  components: {
    NavLink,
    VLink,
    AppIcon
  },
  updated() {
    //  var elems = document.querySelectorAll('.sidenav');
    // eslint-disable-next-line no-undef
    M.AutoInit();
    //  M.Sidenav.init(elems);
  },
  mounted: function() {
    //var elems = document.querySelectorAll('.sidenav');
    // eslint-disable-next-line no-undef
    M.AutoInit();
    //M.Sidenav.init(elems);

    //   this.$nextTick(function () {
    // // Code that will run only after the
    // // entire view has been rendered
    //   })
  }
};
</script>

<style>
.st0 {
  fill: #c1202e;
}
.st1 {
  fill: #f4d913;
}
.st2 {
  fill: #222f65;
}
</style>
