<template>
  <v-card>
    <v-card-title>
      <div class="headline">{{item.headline}}</div>
    </v-card-title>
    <v-card-text>{{item.body}}</v-card-text>
    <v-card-text>{{item.score}}</v-card-text>
    <v-card-actions>
      <v-btn outline round color="success" v-on:click="upvote">
        <v-icon>thumb_up</v-icon>&nbsp{{item.upvotes}}
      </v-btn>
      <v-btn outline round color="red">
        <v-icon>thumb_down</v-icon>&nbsp{{item.downvotes}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import data from "../data"

export default {
  props: {
    uuid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      item: {
        headline: "…",
        body: "…"
      }
    }
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
      data.findByUUID(this.uuid, (error, data) => {
        console.log(data)
        if (data.Items.length == 1) {
          this.item.uuid = data.Items[0].uuid.S
          this.item.timestamp = data.Items[0].timestamp.S
          this.item.headline = data.Items[0].headline.S
          this.item.body = data.Items[0].body.S
          this.item.upvotes = parseInt(data.Items[0].upvotes.N)
          this.item.downvotes = data.Items[0].downvotes.N
        }
      })
    },
    upvote() {
      data.updateUpvotes(this.item, this.item.upvotes+1, (error, data) => {
        console.log(error);
      })
      this.item.upvotes++
      console.log(this.item.upvotes)
    }
  }
}
</script>
