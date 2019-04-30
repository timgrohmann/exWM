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
    <v-card v-for="item in items" :key="item.uuid.S" class="mt-2">
      <v-card-title>
        <div class="headline">{{item.headline.S}}</div>
      </v-card-title>
      <v-card-text>{{item.body.S}}</v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "../store"

export default {
  data() {
    return {
      items: []
    };
  },
  mounted() {
    let params = {
      TableName: 'ExwmEntries'
    }

    // Call DynamoDB to add the item to the table
    store.state.db.scan(params, (err, data) => {
      if (err) {
        console.error("Error while scanning database:", err)
      } else {
        this.items = data.Items
      }
    });
  }
};
</script>