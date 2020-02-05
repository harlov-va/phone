import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify_local';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created(){    
    this.$store.dispatch('fetchUsers');
  }
}).$mount('#app')