import Vue from 'vue';
import Router from 'vue-router';

import DetailPage from './components/DetailPage.vue'
import LandingPage from './components/LandingPage.vue'
import AboutUs from './components/AboutUs.vue'

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'LandingPage',
            components: {
              default: LandingPage,
            }
        },
        {
            path: '/about-us',
            name: 'AboutUs',
            components: {
              default: AboutUs,
            }
        },
        {
          path: '/entry/:id',
          props: {default: (route) => ({ uuid: route.params.id })},
          name: 'DetailPage',
          components: {
            default: DetailPage,
          }
      },
    ]
})