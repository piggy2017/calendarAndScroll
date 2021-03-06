// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueCookies from 'vue-cookies'
import fastclick from 'fastclick';

fastclick.attach(document.body);
Vue.use(MintUI)
Vue.use(VueCookies)
Vue.config.productionTip = false


import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
