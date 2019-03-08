<template>
  <v-app>
    <HeaderBar/>
    <v-content>
      Hello World Content!
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
