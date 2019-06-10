import Vue from 'vue';
import Vuetify from 'vuetify'
import App from './App.vue';
import store from './store'
import './main.styl'
import router from './router'
import VuetifyConfirm from 'vuetify-confirm'

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#4f90c6',
    secondary: '#15e8cf',
    accent: '#8c9eff',
  }
})
Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Bestätigen',
  buttonFalseText: 'Abbrechen',
  color: 'warning',
  icon: 'warning',
  title: 'Warning',
  width: 350,
  property: '$confirm'
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
