<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="headline">{{item.headline}}</div>
      </v-card-title>
      <v-card-text v-html="markedHtml"></v-card-text>
      <v-card-actions>
        <v-btn outline round color="success" @click="upvote" :disabled="!checkIfLoggedIn()">
          <v-icon>thumb_up</v-icon>
          &nbsp;{{upvotes}}
        </v-btn>
        <v-btn outline round color="error" @click="downvote" :disabled="!checkIfLoggedIn()">
          <v-icon>thumb_down</v-icon>
          &nbsp;{{downvotes}}
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
          :to="{name: 'EditEntry', params: {id: uuid}}"
        >Bearbeiten</v-btn>
        <v-btn outline color="error" style="text-decoration:none" @click="del">Löschen</v-btn>
      </v-card-actions>
    </v-card>
    <br>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg6 v-if="checkIfLoggedIn()">
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
      <v-flex xs12 lg6>
        <v-card>
          <v-card-title>
            <h4 class="headline">Alle Kommentare</h4>
          </v-card-title>

          <v-card-text>
            <v-card v-for="c in reversedComments" :key="c.timestamp">
              <v-card-text>
                <v-layout style="color:gray;" justify-space-between>
                  <span>
                    <i>{{c.author}}</i>
                    schrieb am {{timeConverter(c.timestamp)}}
                  </span>
                  <v-btn
                    flat
                    color="red"
                    icon
                    small
                    v-if="c.author == comment.author"
                    @click="deleteComment(c.index)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-layout>
                <div style="overflow-wrap: break-word">{{c.body}}</div>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import marked from "marked"
import data from "../data"
import auth from "../authentication/auth"
import LandingPage from "./LandingPage"

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
        comments: []
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
    checkIfLoggedIn() {
      return auth.isLoggedIn()
    },
    refresh() {
      data.findByUUID(this.uuid, (error, data) => {
        this.item = data
      })
    },
    upvote() {
      let user = auth.getCognitoUser()
      if (user != null) {
        data.addUpvote(this.item, user.getUsername(), err => {
          this.refresh()
        })
      }
    },
    downvote() {
      let user = auth.getCognitoUser()
      if (user != null) {
        data.addDownvote(this.item, user.getUsername(), err => {
          this.refresh()
        })
      }
    },
    addComment() {
      this.comment.timestamp = new Date().getTime()
      data.addComment(this.item, this.comment, error => {
        this.refresh()
      })
    },
    deleteComment(index) {
      data.deleteComment(this.item, index, error => {
        console.log(error)
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
    },
    reversedComments() {
      let coms = this.item.comments.slice()
      coms.forEach((element, index) => {
        element.index = index
      })
      return coms.reverse()
    },
    upvotes() {
      if (this.item.upvoters) {
        return this.item.upvoters.values.length
      }
      return 0
    },
    downvotes() {
      if (this.item.downvoters) {
        return this.item.downvoters.values.length
      }
      return 0
    }
  }
}
</script>
