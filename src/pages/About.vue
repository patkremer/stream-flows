<template>
  <main-layout>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h1>About Colorado Flows</h1>
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
          <p>If you have any questions, comments, or concerns, reach out to me on
            <a target="_blank" href="https://www.linkedin.com/in/patrick-kremer/">Linkedin</a> or find me on instagram
            <a href="https://www.instagram.com/patrickcaresdotorg/">@patrickcaresdotorg</a>
          </p>
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
      this.$ga.page("/");
      this.$ga.screenview({
        screenName: "home"
      });
    }
  }
};
</script>