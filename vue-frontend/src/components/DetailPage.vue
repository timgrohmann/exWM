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
          :to="{name: 'EditEntry', params: {id: item.uuid}}"
        >Bearbeiten</v-btn>
        <v-btn outline color="error" style="text-decoration:none" @click="del">Löschen</v-btn>
      </v-card-actions>
    </v-card>
    <br>
    <v-layout justify-center>
      <v-card width="50%" flat v-if=checkIfLoggedIn()>
        <v-card-title>
          <div class="headline">Kommentar hinzufügen:</div>
        </v-card-title>
        <v-text-field solo label="Dein Name" v-model="comment.author"></v-text-field>
        <v-textarea
          v-model="comment.body"
          label="Kommentar"
          hint="Hier kannst du den Beitrag kommentieren"
          @input="tag_text(comment.body)"
          solo
        ></v-textarea>
        <v-btn fab small color="primary" absolute bottom right v-on:click="addComment">
          <v-icon>send</v-icon>
        </v-btn>
      </v-card>
      <v-card v-if=!checkIfLoggedIn()>
        <v-card-title>
          <div class="headline">Um zu kommentieren und zu voten, musst Du Dich anmelden.</div>
        </v-card-title>
        <v-btn :to="{name: 'SignIn'}">Hier anmelden</v-btn>
      </v-card>
    </v-layout>
    <h4 class="display-1" v-if=checkIfLoggedIn()>Alle Kommentare:</h4>
    <v-card v-for="comment in item.comments" :key="comment.timestamp" v-if=checkIfLoggedIn()>
      <v-card-title>
        <div class="headline">{{comment.author}} schreibt ({{timeConverter(comment.timestamp)}}):</div>
      </v-card-title>
      <v-card-text>{{comment.body}}</v-card-text>
    </v-card>
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
        body: "…"
      },
      comment: {
        author: "",
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
      this.item.comments.push(this.comment)
      data.updateComments(this.item, this.item.comments, error => {
        this.refresh()
      })
    },
    timeConverter(timestamp) {
      var a = new Date(timestamp)
      var months = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ]
      var year = a.getFullYear()
      var month = months[a.getMonth()]
      var date = a.getDate()
      var hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours()
      var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes()
      var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds()
      var time =
        date + ". " + month + " " + year + " um " + hour + ":" + min + ":" + sec
      return time
    },
    del() {

      this.$confirm("Willst Du diesen Beitrag wirklich löschen?", { title: 'Warning' }).then(res => {
        console.log("res: ", res)
        if(res === true) {
          data.deleteEntry(this.item, error => {
            console.log(error)
            this.$router.push({name: "DeleteConfirmation"})
          })
        }
      })


    }
  },
  computed: {
    markedHtml() {
      return marked(this.item.body)
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
