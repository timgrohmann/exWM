<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="headline">Das wird &exist;WM!</div>
      </v-card-title>
      <v-card-text>Auf dieser Seite wird &exist;WM, das tolle Wissensmanagementsystem
        entstehen! Seid gespannt.
      </v-card-text>
    </v-card>
    <v-list two-line class="elevation-2 mt-2">
      <div v-for="(item, index) in items" :key="item.uuid.S">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{item.headline.S}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.body.S}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index < items.length - 1"/>
      </div>
    </v-list>
    
  </div>
</template>

<script>
import db from "../data"

export default {
  data() {
    return {
      items: []
    };
  },
  mounted() {
    db.getAll((err, data) => {
      if (err) {
        console.error("Error while scanning database:", err)
      } else {
        this.items = data.Items
      }
    });
  }
};
</script>