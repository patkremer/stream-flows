import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-localstorage'
import moment from 'vue-moment'
import VueAnalytics from 'vue-analytics';
import VueResource from 'vue-resource';

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

new Vue({
  render: h => h(App),
}).$mount('#app');
