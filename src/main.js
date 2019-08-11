import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import func from './common/function';
import service from './common/service';

// import vueBeauty from 'vue-beauty'
// import 'vue-beauty/package/style/vue-beauty.min.css'
// Vue.use(vueBeauty)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$func = func;
Vue.prototype.$service = service;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
