import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from './components/LandingPage.vue'
import AboutUs from './components/AboutUs.vue'
import AllEntries from './components/AllEntries.vue'
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
            path: '/all_entries',
            name: 'AllEntries',
            components: {
                default: AllEntries,
          }
        },
        {
            path: '/new',
            name: 'CreateEntry',
            components: {
                default: CreateEntry,
            }
        }
    ]
})
