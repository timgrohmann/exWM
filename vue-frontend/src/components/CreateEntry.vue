<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-alert v-model="alert" dismissible type="error">Die eingegebene E-Mail-Adresse ist ungültig!</v-alert>
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

    <hr class="mb-2">

    <v-combobox
      v-model="chips"
      label="Schlagwörter"
      chips
      clearable
      prepend-icon="filter_list"
      append-icon
      solo
      multiple
      hide-no-data
      :items="[]"
    >
      <template v-slot:selection="data">
        <v-chip
          :selected="data.selected"
          label
          @click="remove(data.item)"
          color="primary lighten-3"
        >
          <strong>{{ data.item }}</strong>&nbsp;
        </v-chip>
      </template>
    </v-combobox>

    <v-card class="mb-2">
      <v-card-text>
        <p class="subheading">Tag-Vorschläge aus dem Beitragstext</p>
        <v-chip
          v-for="st in filteredTags"
          :key="st"
          @click="chips.push(st)"
          color="deep-purple lighten-4"
        >
          <strong>{{ st }}</strong>&nbsp;
        </v-chip>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text>
        <p class="subheading">Bereits verwendete Tags</p>
        <v-chip
          v-for="st in filteredAllTags"
          :key="st"
          @click="chips.push(st)"
          color="green lighten-3"
        >
          <strong>{{ st }}</strong>&nbsp;
        </v-chip>
      </v-card-text>
    </v-card>
    <!--@keyup="suggested_tags = tag_text(body)"-->

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
        <v-chip v-for="chip in chips" :key="chip" label>
          <strong>{{ chip }}</strong>&nbsp;
        </v-chip>
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
      suggested_tags: ["Vorschlag 1", "Vorschlag 2"],
      chips: [],
      all_tags: [],
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
  computed: {
    filteredTags() {
      return this.suggested_tags.filter(
        x => !this.chips.includes(x) & !this.all_tags.includes(x)
      )
    },
    filteredAllTags() {
      return this.all_tags.filter(x => !this.chips.includes(x))
    }
  },
  mounted() {
    data.getAllTags(tags => {
      this.all_tags = tags
    })
  },
  methods: {
    createEntry() {
      console.log(typeof this.email)
      this.dialog = false
      console.log(this.rules.email.regex)
      if (
        this.email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        let entry = {
          headline: this.headline,
          body: this.body,
          uuid: data.makeHash(this.body, this.headline),
          timestamp: String(Math.floor(new Date() / 1000)),
          upvotes: 0,
          downvotes: 0,
          email: this.email,
          comments: [],
          keyword: this.chips
        }
        data.insertNew(entry, uuid => {
          this.$router.push({
            name: "DetailPage",
            params: { id: uuid }
          })
        })
        this.chips
          .filter(x => !this.all_tags.includes(x))
          .forEach(tag => {
            data.insertNewTag(tag, error => {
              if (error) {
                console.log("Error while putting chips", error)
              }
            })
          })

        console.log(entry)
      } else {
        this.email = this.email
        this.alert = true
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
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
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
