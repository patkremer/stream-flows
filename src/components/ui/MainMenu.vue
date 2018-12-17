<template>
  <div id="mainMenu">
     <ul id="slide-out" class="sidenav">
       <li class="sidenav-close">
         <div class="user-view">
            <v-link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 100 100">
                <rect x="1.75"
                  y="1.75"
                  rx="50"
                  ry="50"
                  width="96.5"
                  height="96.5"
                  fill="#00796b"></rect>
                
                <text x="50"
                  y="50"
                  dx="-2.5"
                  dy="2"
                  fill="#ffffff"
                  font-size="82"
                  font-family="Annie Use Your Telescope"
                  text-anchor="middle"
                  dominant-baseline="central">CF</text>
                
                <rect x="1.75"
                  y="1.75"
                  rx="50"
                  ry="50"
                  width="96.5"
                  height="96.5"
                  fill-opacity="0"
                  stroke="#004d40"
                  stroke-width="3.5"></rect>
            </svg>
            </v-link>
          </div>
      <li><div class="divider"></div></li>
      <nav-link href="/"><i class="material-icons left">home</i> Home</nav-link>
      <nav-link href="/charts"><i class="material-icons left">bar_chart</i>Charts</nav-link>

      <nav-link href="/about"><i class="material-icons left">info</i>About</nav-link>
    </ul>
    <a href="#" data-target="slide-out" class="sidenav-trigger btn-flat btn grey-text text-darken-4"><i class="material-icons">menu</i></a>
  </div>
  
</template>

<script>
import NavLink from './NavLink.vue';
import VLink from './VLink.vue'
  export default {
    name: 'main-menu',
    components: {
      NavLink,
      VLink
    },
    updated() {
      //  var elems = document.querySelectorAll('.sidenav');
      // eslint-disable-next-line no-undef
      M.AutoInit();
      //  M.Sidenav.init(elems);
      
    },
    mounted: function () {
      //var elems = document.querySelectorAll('.sidenav');
      // eslint-disable-next-line no-undef
      M.AutoInit();
      //M.Sidenav.init(elems);

    //   this.$nextTick(function () {
    // // Code that will run only after the
    // // entire view has been rendered
    //   })
    }
  }
</script>

<style>

</style>
