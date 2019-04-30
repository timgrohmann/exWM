import Vue from 'vue';
import Vuetify from 'vuetify'
import App from './App.vue';
import store from './store'
import './main.styl'
import router from './router'
const AWS = require('aws-sdk');

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#4f90c6',
    secondary: '#15e8cf',
    accent: '#8c9eff',
    error: '#ff9800',
  }})

// Amazon Cognito-Anmeldeinformationenanbieter initialisieren
AWS.config.region = 'eu-west-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:7c77cf43-a78c-40cd-a3c3-9ca2a0da7330',
});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

store.commit("setDB", ddb)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
