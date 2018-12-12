import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-localstorage'
import moment from 'vue-moment'

Vue.use(VueLocalStorage)
Vue.use(moment);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app');
