import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' //主要的AJAX套宴
import VueAxios from 'vue-axios'
import 'bootstrap'
import { Swipe, SwipeItem } from 'vue-swipe'
import $ from "jquery";
import './assets/fonts/fonts.css'
window.$ = $;

// set baseUrl123
axios.defaults.baseURL = 'https://mb-database.herokuapp.com/';

Vue.use(VueAxios, axios) //使axios能在其他的元件裡被使用
Vue.config.productionTip = false

Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem); 

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
