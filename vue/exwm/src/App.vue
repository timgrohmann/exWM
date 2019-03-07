<template>
  <v-app>
    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'Myap',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
