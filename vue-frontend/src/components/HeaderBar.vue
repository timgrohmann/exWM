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
        <v-img src="/ewm.svg" max-height="100%" position="left center" contain/>
      </router-link>

      <v-spacer></v-spacer>
      <v-autocomplete
        v-model="model"
        :items="entries"
        :search-input.sync="search"
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label="Suche nach einem Eintrag..."
        solo
        :filter="filterItems"
      >
        <template v-slot:item="{ item }">
          <v-list-tile @click="model=false" :to="{name: 'DetailPage', params: {id: item.uuid}}">
            <v-list-tile-avatar
              color="indigo"
              class="headline font-weight-light white--text"
            >{{ item.headline.charAt(0) }}</v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.headline"></v-list-tile-title>
              <v-list-tile-sub-title v-text="item.body"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <!--          <v-list-tile-action>-->
          <!--            <v-icon>mdi-coin</v-icon>-->
          <!--          </v-list-tile-action>-->
        </template>
      </v-autocomplete>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import db from "../data"
import { EntryItem } from "../declarations/item"

export default Vue.extend({
  methods: {
    filterItems(item: any, queryText: any) {
      // console.log("filter items: " + queryText);
      const query = queryText.toLowerCase()
      const title = item.headline.toLowerCase()

      //search for keywords
      let keywords: Array<String> = item.keyword
      if (item.keyword != null) {
        console.log("keywords not null")
        for (let i = 0; i < keywords.length; i++) {
          console.log("keywords" + keywords[i])
          if (keywords[i].toLowerCase().indexOf(query) > -1) {
            return true
          }
        }
      } else {
        console.log("keywords null")
      }

      return title.indexOf(query) > -1
    }
  },
  data: () => ({
    search: null,
    isLoading: false,
    model: null,
    items: [
      { icon: "face", name: "Über uns", link: { name: "AboutUs" } },
      { icon: "add", name: "Neuer Eintrag", link: { name: "CreateEntry" } },
      { icon: "list", name: "Alle Beiträge", link: { name: "AllEntries" } },
      { icon: "person", name: "Anmelden", link: { name: "SignIn" } }
    ],
    visible: false,
    entries: [] as EntryItem[]
  }),
  mounted() {
    db.getAll((err, data) => {
      if (err) {
        console.error("Error while scanning database:", err)
      } else {
        this.entries = data
      }
    })
  }
}) 
</script>

