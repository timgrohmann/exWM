<template>
  <div>
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
          <a
            style="text-decoration:none"
            :href="'mailto:'+item.email+'?subject=Rückmeldung zu: '+item.headline"
          >Rückmeldung geben</a>
        </v-btn>
      </v-card-actions>
    </v-card>
    <br>
    <v-layout justify-center>
      <v-card width="50%" flat img="null">
        <v-card-title>
          <div class="headline">Kommentar hinzufügen:</div>
        </v-card-title>
        <v-text-field solo label="Dein Name" v-model="headline"></v-text-field>
        <v-textarea
          v-model="commentBody"
          label="Kommentar"
          hint="Hier kannst du den Beitrag kommentieren"
          @input="tag_text(commentBody)"
          solo
        ></v-textarea>
        <v-card-actions>
          <v-btn fab small color="primary" absolute top right>
            <v-icon>send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </div>
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
  },
  computed: {
    markedHtml() {
      return marked(this.item.body)
    }
  }
}
</script>
