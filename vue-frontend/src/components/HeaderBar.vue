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
      <v-btn color="primary" icon @click="$router.go(-1)">
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <router-link :to="{name: 'LandingPage'}" class="v-responsive" style="max-height: 100%">
        <v-img src="ewm.svg" max-height="100%" position="left center" contain/>
      </router-link>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: "face", name: "Über uns", link: { name: "AboutUs" } },
      { icon: "search", name: "Suche" },
      { icon: "add", name: "Neuer Eintrag", link: { name: "CreateEntry" } },
      { icon: "list", name: "Alle Beiträge", link: { name: "AllEntries" } },
    ],
    visible: false
  })
}
</script>

<style>
</style>
