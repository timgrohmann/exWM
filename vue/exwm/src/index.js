import Vue from 'vue';
import Vuetify from 'vuetify'
import App from './App.vue';
import store from './store'
import './main.styl'

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#42a5f5',
    secondary: '#26c6da',
    accent: '#8c9eff',
    error: '#ff9800',
  }})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
