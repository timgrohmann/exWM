<template>
  <v-card>
    <v-card-title>
      <div class="headline">{{item.headline}}</div>
    </v-card-title>
    <v-card-text v-html="markedHtml"></v-card-text>
    <v-card-actions>
      <v-btn outline round color="success" @click="upvote">
        <v-icon>thumb_up</v-icon>
        &nbsp;{{item.upvotes}}
      </v-btn>
      <v-btn outline round color="error" @click="downvote">
        <v-icon>thumb_down</v-icon>
        &nbsp;{{item.downvotes}}
      </v-btn>
      <v-btn outline color="primary">
        <a style="text-decoration:none" :href="'mailto:'+item.email+'?subject=Rückmeldung zu: '+item.headline">Rückmeldung geben</a>
      </v-btn>
      <v-btn outline color="primary" style="text-decoration:none" :to="{name: 'EditEntry', params: {id: item.uuid}}">Bearbeiten</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import marked from "marked"
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
        body: "…",
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
  },
  computed: {
    markedHtml() {
      return marked(this.item.body)
    }
  }
}
</script>
