import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from './components/LandingPage.vue'
import AboutUs from './components/AboutUs.vue'
import CreateEntry from './components/CreateEntry.vue'

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
            path: '/new',
            name: 'CreateEntry',
            components: {
                default: CreateEntry,
            }
        },
        {
          path: '/detail-page',
          name: 'DetailPage',
          components: {
              default: DetailPage,
          }
      }
    ]
})