<template>
  <v-app>
    <HeaderBar/>
    <v-content>
      <v-container grid-list-md >
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'

export default {
  name: 'App',
  components: {
    HeaderBar
  },
  data () {
    return {
      //
    }
  }
}
</script>
