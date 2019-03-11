<template>
  <div>
    <v-navigation-drawer app v-model="visible" mobile-break-point="10000">
      <v-list>
        <v-list-tile v-for="item in items" :key="item.name" :to="item.link">
          <v-list-tile-action>
            <v-icon color="secondary">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark>
      <v-toolbar-side-icon @click="visible = !visible"/>
      <router-link :to="{name: 'LandingPage'}" class="v-responsive" style="max-height: 100%">
        <v-img src="ewm.svg" max-height="100%" position="left center" contain/>
      </router-link>
      <v-spacer />
      <v-menu nudge-bottom="40">
        <v-btn slot="activator" icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-container grid-list-xs="2" style="background-color: white">
          <v-layout row wrap>
            <v-flex
              v-for="icon in icons"
              :key="icon"
              xs4
              text-md-center
            >
              <v-icon medium color="primary">{{icon}}</v-icon>
            </v-flex>
          </v-layout>
        </v-container>
      </v-menu>
      
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: "face", name: "Über uns", link: {name: "AboutUs"} },
      { icon: "search", name: "Suche" }
    ],
    icons: [
      "search", "person", "contacts", "tv", "favorite", "phone", "home", "pause", "stop"
    ],
    visible: false
  })
};
</script>

<style>
</style>
