<template>
  <v-card>
    <v-card-title>
      <div class="headline">{{item.headline}}</div>
    </v-card-title>
    <v-card-text>{{item.body}}</v-card-text>
    <v-card-text>{{item.score}}</v-card-text>
    <v-card-actions>
      <v-btn outline round color="success" @click="upvote">
        <v-icon>thumb_up</v-icon>
        &nbsp;{{item.upvotes}}
      </v-btn>
      <v-btn outline round color="red" @click="downvote">
        <v-icon>thumb_down</v-icon>
        &nbsp;{{item.downvotes}}
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
        this.item = data
      })
    },
    upvote() {
      data.incrementUpvotes(this.item, error => {
        this.refresh()
      })
    },
    downvote() {
      data.incrementDownvotes(this.item, error => {
        this.refresh()
      })
    }
  }
}
</script>
