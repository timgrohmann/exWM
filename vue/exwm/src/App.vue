<template>
  <v-app>
    <HeaderBar/>
    <v-content>
      <v-container grid-list-md>
        <v-card>
          <v-card-title>
            <div class="headline">Hier könnten Dinge stehen!</div>
          </v-card-title>
          <v-card-text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, ad. Natus, reiciendis commodi doloribus laudantium mollitia maxime nulla dolore libero voluptatum necessitatibus, dolorem fugiat at neque hic, eaque fugit nemo.</v-card-text>
        </v-card>
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
