<template>
  <div id="mainMenu">
    <ul id="slide-out" class="sidenav">
      <li class="sidenav-close">
        <div class="user-view">
          <v-link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              style="enable-background:new 0 0 1000 1000;"
              xml:space="preserve"
            >
              <path
                class="st0"
                d="M499.2,16c-9.5,16.2-13.7,35.7-5.2,55.8c6.2,14.7,17.9,26.8,30.2,39.7c10.9,11.3,22.1,23,30.6,37.3
	c25.6,43.3,17.4,80.4,0.9,113.5c86.1,15,156.6,75.4,185.8,155.7l229.8-79.5C904.5,150.3,725,15.6,514,15.6
	C509,15.6,504.1,15.8,499.2,16z"
              ></path>
              <path
                class="st0"
                d="M208.6,850.2l-2-3.5c-20.9-36.1-40.6-70.3-34.9-117.8c3.8-31.6,16.4-60.4,28.5-88.3
	c14.1-32.3,27.4-62.7,26.7-95.4c-0.5-27.7-14-52.5-28.3-78.8c-18.7-34.5-38.1-70.1-30-115.2c5.5-30.4,21.6-56.5,37.2-81.7
	c28.4-45.8,44.5-76,20.1-117.3c-5.4-9.1-12.7-17.4-20.7-25.8C97.6,215.5,29,350,29,500.6c0,160.2,77.7,302.2,197.4,390.5
	C222.3,877.5,216.4,863.8,208.6,850.2z"
              ></path>
              <path
                class="st0"
                d="M514,742.6c-3,0-5.9-0.1-8.8-0.2c-0.2,1.1-0.4,2.2-0.5,3.3c-4.4,36.8,11.1,63.8,30.8,97.8l2,3.5
	c25.9,45,34.2,92,25.4,136.1c189.2-19,346.3-146.6,408-319.6l-229-81.7C708.6,675.5,619.1,742.6,514,742.6z"
              ></path>
              <path
                class="st1"
                d="M555.6,262.4c-6.4,12.9-14,25.2-21.4,37.1c-14.7,23.7-28.5,46-32.9,70.4c-6.1,34,9.7,63.2,26.5,94.1
	c15.5,28.5,31.5,58,32.2,93.5c0.8,39.7-14.6,74.9-29.4,108.9c-11.3,25.8-21.9,50.3-25.6,75.9c2.9,0.1,5.9,0.2,8.8,0.2
	c133.6,0,241.9-108.3,241.9-241.9C755.9,381.2,669.4,282.1,555.6,262.4z"
              ></path>
              <path
                class="st2"
                d="M521,258.8c18.8-33.5,26-59.9,6-93.7c-6.6-11.1-16-21-26-31.4c-13.9-14.4-28.2-29.3-36.7-49.5
	c-9-21.4-9.2-44.3-1.7-65.9c-85.8,9.1-164.9,40.6-231.5,88.5c8.2,8.8,16.3,18.2,22.7,29.1c35.6,60.2,5.8,108.3-20.5,150.7
	c-14.7,23.7-28.5,46-32.9,70.4c-6.1,34,9.8,63.2,26.5,94.1c15.5,28.5,31.5,58,32.2,93.5c0.8,39.7-14.6,74.9-29.4,108.9
	c-11.7,26.9-22.8,52.3-26.1,79.2c-4.4,36.8,11.1,63.8,30.8,97.8l2,3.5c15.6,27.1,24.7,54.8,27.6,82.3c73,43.9,158.4,69.3,249.8,69.3
	c5.2,0,10.3-0.1,15.4-0.3c10.3-39,3.9-81.1-19.8-122.3l-2-3.5c-20.9-36.1-40.6-70.3-34.9-117.8c0.1-0.9,0.3-1.8,0.4-2.7
	c4.2-30.5,16.3-58.5,28.1-85.6c14.1-32.3,27.4-62.7,26.7-95.4c-0.5-27.7-14-52.5-28.3-78.8c-18.7-34.5-38.1-70.1-30-115.2
	c5.5-30.4,21.6-56.5,37.2-81.7C512,274.1,516.8,266.3,521,258.8"
              ></path>
            </svg>
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
export default {
  name: "main-menu",
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
