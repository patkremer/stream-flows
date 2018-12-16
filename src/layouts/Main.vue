
<template>
  <div id="app">
    <!-- <nav class="grey darken-4">
      
    </nav> -->

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
      <nav-link href="/about"><i class="material-icons left">info</i>About</nav-link>
    </ul>
    <a href="#" data-target="slide-out" class="sidenav-trigger btn-small white-text grey darken-4"><i class="material-icons">menu</i></a>
   

    <slot></slot>
    <footer class="page-footer grey lighten-3">
          <div class="footer-copyright">
            <div class="container black-text center">
              Colorado Flows - Created December 2018
              <!-- <a class="grey-text text-lighten-4 right" href="#!">More Links</a> -->

            </div>
          </div>
        </footer>
  </div>
        
</template>

<script>
  import NavLink from '../components/ui/NavLink.vue';
  import VLink from '../components/ui/VLink.vue'
  export default {
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
@import url('https://fonts.googleapis.com/css?family=Annie+Use+Your+Telescope');
.nav-wrapper {
  padding-left: 10px;
}
.user-view {
  min-height: 75px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #222;
  background-color: #fafafa;
  /* padding-left: 20px;
  padding-right: 20px; */
}
</style>
