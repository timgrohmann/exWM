import Vue from 'vue';
import Router from 'vue-router';

import DetailPage from './components/DetailPage.vue'
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
<<<<<<< HEAD
            path: '/new',
            name: 'CreateEntry',
            components: {
                default: CreateEntry,
            }
        },
        {
          path: '/detail-page',
=======
>>>>>>> 2b2ae26a6cf779c525a81215f03283d8ca8604c1
          path: '/entry/:id',
          props: {default: (route) => ({ uuid: route.params.id })},
          name: 'DetailPage',
          components: {
            default: DetailPage,
          }
      },
    ]
})