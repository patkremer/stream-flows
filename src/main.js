import Vue from 'vue'
import routes from './routes';
import NotFound from './pages/404.vue';
import VueLocalStorage from 'vue-localstorage'
import moment from 'vue-moment'
import VueAnalytics from 'vue-analytics';
import VueResource from 'vue-resource';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);
Vue.use(VueResource);
Vue.use(VueAnalytics, {
  id: 'UA-125445562-2',
    // batch: {
    //   enabled: true, // enable/disable
    //   amount: 2, // amount of events fired
    //   delay: 500 // delay in milliseconds
    // }
});
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true 
});
Vue.use(moment);
Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound;
    }
  },
  render (h) {
    return h(this.ViewComponent); 
  },
});


window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});