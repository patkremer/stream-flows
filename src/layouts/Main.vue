
<template>
  <div id="app">
    <!-- <nav class="grey darken-4">
      
    </nav> -->

   <main-menu></main-menu>
   

    <slot></slot>
    <footer class="page-footer grey lighten-3">
          <div class="footer-copyright">
            <div class="container black-text center">
              <app-icon class="left" width="25" height="25" style="vertical-align: sub;"></app-icon> © 2019 Colorado Flows 
              <!-- <a class="grey-text text-lighten-4 right" href="#!">More Links</a> -->
            </div>
          </div>
        </footer>
  </div>
        
</template>

<script>
  import MainMenu from '../components/ui/MainMenu.vue';
  import AppIcon from '../components/ui/AppIcon.vue';
  export default {
    components: {
      MainMenu,
      AppIcon
    },
   
    mounted: function () {
 
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
  /* background-color: #fafafa; */
  /* padding-left: 20px;
  padding-right: 20px; */
}
</style>
