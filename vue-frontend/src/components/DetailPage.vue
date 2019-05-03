<template>
    <v-card>
      <v-card-title>
        <div class="headline"> {{uuid}}</div>
      </v-card-title>
      <v-card-text>{{items[0].body.S}}
      </v-card-text>
    </v-card>
</template>

<script>
import db from "../data"

export default {
  props: {
    uuid: {
      type: String
    }
  },
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