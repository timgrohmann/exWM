<template>
    <v-card>
      <v-card-title>
        <div class="headline">{{item.headline}}</div>
      </v-card-title>
      <v-card-text>{{item.body}}
      </v-card-text>
    </v-card>
</template>

<script>
import db from "../data"

export default {
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      item: {
        headline: "…",
        body: "…"
      }
    };
  },
  watch: {
    uuid() {
      this.refresh()
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      db.findByUUID(this.uuid, (error, data) => {
        console.log(data);
        if (data.Items.length == 1){
          this.item.headline = data.Items[0].headline.S
          this.item.body = data.Items[0].body.S
        }
      })
    }
  }
};
</script>