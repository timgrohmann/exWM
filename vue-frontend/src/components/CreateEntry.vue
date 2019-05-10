<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      type="error"
    >
      Die eingegebene E-Mail-Adresse ist ungültig!
    </v-alert>
    <h1>Neuen Eintrag erstellen</h1>
    <v-text-field label="Überschrift" v-model="headline" solo></v-text-field>
    <v-textarea
      v-model="body"
      label="Beitragstext"
      hint="Hier den Text für den Beitrag eingeben"
      solo
      @input="tag_text(body)"
    ></v-textarea>
    <v-text-field
      label="E-Mail-Adresse (für Rückfragen)"
      v-model="email"
      solo
      prepend-inner-icon="mail"
      type="email"
      :rules="[rules.email.regex]"
    ></v-text-field>

    <!--@keyup="suggested_tags = tag_text(body)"-->
    <template>
      <div class="text-xs-center">
        <div class="text-xs-center">
          <v-btn
            v-if="suggested_tags.length == declined_tags.length && suggested_tags.length != 0"
            color="secondary"
            dark
            @click="declined_tags = []"
          >Reset Chips</v-btn>
        </div>
        <v-chip
          v-for="st in suggested_tags"
          v-if="!declined_tags.includes(st)"
          close
          @click="declined_tags.push(st)"
        >{{st}}</v-chip>
      </div>
    </template>

    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <div class="text-xs-center">
          <v-btn large color="primary" @click="dialog = true">Vorschau öffnen</v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title class="headline primary lighten-2" primary-title>Vorschau</v-card-title>
        <v-card-text class="title">{{headline}}</v-card-text>
        <v-card-text v-html="preview"></v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="abort" flat @click="dialog = false">Abbrechen</v-btn>
          <v-btn large color="primary" v-on:click="createEntry">Beitrag erstellen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import data from "../data"

const marked = require("marked")

export default {
  data() {
    return {
      headline: null,
      body: null,
      preview: "",
      dialog: false,
      suggested_tags: ["Holz", "Beize", "Schmirgelpapier"],
      declined_tags: [],
      email: "",
      alert: false,
      rules: {
        email: {
          required: v => !!v || "E-Mail-Adresse eingeben!",
          regex: v =>
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "Ungültige E-Mail-Adresse"
        }
      }
    }
  },
  methods: {
    createEntry() {
      console.log(typeof this.email)
      this.dialog = false
      console.log(this.rules.email.regex)
      if (this.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        let entry = {
          headline: this.headline,
          body: this.body,
          uuid: data.makeHash(this.body, this.headline),
          timestamp: String(Math.floor(new Date() / 1000)),
          upvotes: 0,
          downvotes: 0,
          email: this.email
        }
        data.insertNew(entry, uuid => {
          this.$router.push({
            name: "DetailPage",
            params: { id: uuid }
          })
        })
        console.log(entry)
      }
      else {
        this.email = this.email;
        this.alert = true;
      }
    },
    tag_text(t) {
      const http = new XMLHttpRequest()
      const url = 'http://127.0.0.1:5000/suggest_tags?text=" ' + t + ' "'

      http.open("GET", url)
      http.send()
      http.onreadystatechange = e => {
        console.log("This is the response: ", http.responseText)
        this.suggested_tags = JSON.parse(http.responseText)
      }
    }
  },
  watch: {
    dialog() {
      if (this.dialog) {
        console.log(this.body)
        this.preview = marked(this.body)
      }
    }
  }
}
</script>
