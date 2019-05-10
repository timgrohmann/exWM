import Vue from 'vue';
import Router from 'vue-router';

import DetailPage from './components/DetailPage.vue'
import LandingPage from './components/LandingPage.vue'
import AboutUs from './components/AboutUs.vue'
import AllEntries from './components/AllEntries.vue'
import CreateEntry from './components/CreateEntry.vue'

Vue.use(Router);

export default new Router({
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
      path: '/all',
      name: 'AllEntries',
      components: {
        default: AllEntries,
      }
    },
    {
      path: '/entry/:id',
      props: {
        default: (route) => ({uuid: route.params.id})
      },
      name: 'DetailPage',
      components: {
        default: DetailPage,
      }
    },
  ]
})
