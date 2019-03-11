import Vue from 'vue';
import Router from 'vue-router';

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
        }
    ]
})