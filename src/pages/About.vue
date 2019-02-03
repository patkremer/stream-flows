<template>
  <main-layout>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h2>About Colorado Flows</h2>
          <p>I'm Patrick Kremer and I am a
            <a
              target="_blank"
              href="https://www.linkedin.com/in/patrick-kremer/"
            >mobile app/web developer</a>, by profession. I fish for fun. Colorado Flows was created as a side project to learn new technologies. I liked using it, so decided to put it out to the world incase others found it useful.
          </p>
          <p>
            Currently, the app is displaying data from
            <a
              target="_blank"
              href="http://www.dwr.state.co.us/SurfaceWater/Default.aspx"
            >http://www.dwr.state.co.us/SurfaceWater/Default.aspx</a>
            and
            <a
              target="_blank"
              href="https://waterservices.usgs.gov/"
            >https://waterservices.usgs.gov/</a>. These sources provide realtime information and I combine them so they can be searched easily, along with the ability to check the weather
            and link to the respective websites.
          </p>
          <p>
            When I get time to work on Colorado Flows, I am planning on adding some of the features listed below.
          </p>
          <ul class="browser-default">
            <li>Add a feature to view a graph with the history of the rivers flow</li>
            <li>Add a feature to Create a user account so favorites can be accessed cross devices</li>
            <li>Improve UI for search and search settings/filters</li>
            <li>Full Screen map view</li>
          </ul>
          <p>If you have any questions, comments, or concerns, reach out to me on
            <a target="_blank" href="https://www.linkedin.com/in/patrick-kremer/">Linkedin</a> or find me on instagram
            <a href="https://www.instagram.com/patrickcaresdotorg/" target="_blank">@patrickcaresdotorg</a>
          </p>
          <p>Colorado Flows is built with <a href="https://vuejs.org" target="_blank">Vue.Js</a> and <a href="https://materializecss.com" target="_blank">Materialize Css</a>.</p>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";
export default {
  name: "about",
  components: {
    MainLayout
  },
  methods: {
    track() {
      this.$ga.page("/about");
      this.$ga.screenview({
        screenName: "about"
      });
    }
  },
  mounted() {
    this.track();
  }
};
</script>