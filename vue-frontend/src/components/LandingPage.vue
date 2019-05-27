<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="headline">Das wird &exist;WM!</div>
      </v-card-title>
      <v-card-text>
        Auf dieser Seite wird &exist;WM, das tolle Wissensmanagementsystem
        entstehen! Seid gespannt.
      </v-card-text>
    </v-card>
    <v-list two-line class="elevation-2 mt-2">
      <div v-for="(item, index) in items" :key="item.uuid">
        <v-list-tile :to="{name: 'DetailPage', params: {id: item.uuid}}">
          <v-list-tile-content>
            <v-list-tile-title>
              {{item.headline}}
              <span v-if="item.upvotes>=item.downvotes" style="color:green">{{"("+(item.upvotes-item.downvotes).toString()+")"}}</span>
              <span v-if="item.downvotes>item.upvotes" style="color:red">{{"(-"+(item.downvotes-item.upvotes).toString()+")"}}</span>
              </v-list-tile-title>
            <v-list-tile-sub-title>{{item.body}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index < items.length - 1"/>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import db from "../data"
import { EntryItem } from "../declarations/item"

export default Vue.extend({
  data() {
    return {
      items: [] as EntryItem[]
    }
  },
  mounted() {
    db.getAll((err, data) => {
      if (err) {
        console.error("Error while scanning database:", err)
      } else {
        this.items = data
      }
    })
  }
})
</script>
