import Vue from 'vue';
import Router from 'vue-router';

import DetailPage from './components/DetailPage.vue'
import LandingPage from './components/LandingPage.vue'
import AboutUs from './components/AboutUs.vue'
import AllEntries from './components/AllEntries.vue'
import CreateEntry from './components/CreateEntry.vue'
import EditEntry from './components/EditEntry.vue'
import SignIn from './components/SignIn'
import DeleteConfirmation from './components/DeleteConfirmation.vue'

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
      path: '/deleted',
      name: 'DeleteConfirmation',
      components: {
        default: DeleteConfirmation,
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
      path: '/edit/:id',
      props: {
        default: (route) => ({ uuid: route.params.id })
      },
      name: 'EditEntry',
      components: {
        default: EditEntry,
      }
    },
    {
      path: '/entry/:id',
      props: {
        default: (route) => ({ uuid: route.params.id })
      },
      name: 'DetailPage',
      components: {
        default: DetailPage,
      }
    },
    ,
    {
      path: '/signin',
      name: 'SignIn',
      props: {
        default: (route) => ({ token: route.params.token })
      },
      components: {
        default: SignIn,
      }
    },
    /**
     * This is a redirect to handle AWS tokens
     */
    {
      path: '/id_token=:token',
      redirect: to => {
        const { hash, params, query } = to
        if (params.token) {
          return {
            name: 'SignIn',
            params: { token: params.token }
          }
        }
      }
    }
  ]
})
