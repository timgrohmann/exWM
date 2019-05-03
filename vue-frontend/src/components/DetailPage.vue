<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="headline"> {{items[0].title}}</div>
      </v-card-title>
      <v-card-text>{{items[0].body}}
      </v-card-text>
    </v-card>
    
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