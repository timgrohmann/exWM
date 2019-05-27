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
        <v-btn
          outline
          color="primary"
          style="text-decoration:none"
          :to="{name: 'EditEntry', params: {id: item.uuid}}"
        >Bearbeiten</v-btn>
        <v-btn outline color="error" style="text-decoration:none" @click="del">Löschen</v-btn>
      </v-card-actions>
    </v-card>
    <br>
    <v-layout justify-center>
      <v-flex xs12 md8>
        <v-card>
          <v-card-title>
            <div class="headline">Beitrag kommentieren</div>
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="comment.body"
              label="Kommentar"
              hint="Hier kannst du den Beitrag kommentieren"
              solo
              hide-details
            ></v-textarea>
            <p class="mb-0 mt-2">
              Dein Kommentar wird als
              <i>{{comment.author}}</i> gepostet.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary" v-on:click="addComment">Kommentieren</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-spacer/>
    <h4 class="headline">Alle Kommentare</h4>
    <v-card v-for="comment in item.comments" :key="comment.timestamp">
      <v-card-title>
        <div class="title">
          <i>{{comment.author}}</i>
          schrieb am {{timeConverter(comment.timestamp)}}:
        </div>
      </v-card-title>
      <v-card-text>{{comment.body}}</v-card-text>
    </v-card>
  </div>
</template>

<script>
import marked from "marked"
import data from "../data"
import LandingPage from "./LandingPage"
import auth from "../authentication/auth"

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
      },
      comment: {
        author: null,
        body: "",
        timestamp: 0
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
    auth
      .getUser()
      .then(user => {
        this.comment.author = user.getUsername()
      })
      .catch(() => {
        this.comment.author = null
      })
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
    },
    addComment() {
      this.comment.timestamp = new Date().getTime()
      data.addComment(this.item, this.comment, error => {
        this.refresh()
      })
    },
    timeConverter(timestamp) {
      let a = new Date(timestamp)
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
      return a.toLocaleDateString("de-DE", options)
    },
    del() {
      this.$confirm("Willst Du diesen Beitrag wirklich löschen?", {
        title: "Warning"
      }).then(res => {
        console.log("res: ", res)
        if (res === true) {
          data.deleteEntry(this.item, error => {
            console.log(error)
            this.$router.push({ name: "DeleteConfirmation" })
          })
        }
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
