import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './plugins/bootstrapVue';
import './plugins/fontawesome.js';

Vue.config.productionTip = false
console.log(store);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
