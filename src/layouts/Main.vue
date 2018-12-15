
<template>
  <div id="app">
    <!-- <nav class="grey darken-4">
      
    </nav> -->

    <ul id="slide-out" class="sidenav">
      
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
  import NavLink from '../components/NavLink.vue'
  export default {
    components: {
      NavLink
    },
    updated() {
       var elems = document.querySelectorAll('.sidenav');
      // eslint-disable-next-line no-undef
       M.Sidenav.init(elems);

    },
    mounted: function () {
      var elems = document.querySelectorAll('.sidenav');
      // eslint-disable-next-line no-undef
      M.Sidenav.init(elems);

    //   this.$nextTick(function () {
    // // Code that will run only after the
    // // entire view has been rendered
    //   })
    }
  }
</script>

<style>
.nav-wrapper {
  padding-left: 10px;
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
