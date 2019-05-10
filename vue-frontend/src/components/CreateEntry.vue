<template>
  <div>
    <h1>Neuen Eintrag erstellen</h1>
    <v-text-field label="Überschrift" v-model="headline" solo></v-text-field>
    <v-textarea
      label="Beitragstext"
      v-model="body"
      hint="Hier den Text für den Beitrag eingeben"
      solo
    ></v-textarea>
    <v-combobox
      v-model="chips"
      :items="items.concat(chips)"
      label="Schlagwörter"
      chips
      clearable
      prepend-icon="filter_list"
      solo
      multiple
      cache-items
    >
      <template v-slot:selection="data">
        <v-chip
          :selected="data.selected"
          close
          label
          @input="remove(data.item)"
        >
          <strong>{{ data.item }}</strong>&nbsp;
        </v-chip>
      </template>
    </v-combobox>

    <!--@keyup="suggested_tags = tag_text(body)"-->
    <template>
      <div class="text-xs-center">
        <v-chip v-for="st in filteredTags" :key="st" close @click="declined_tags.push(st)">{{st}}</v-chip>
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

export default {
  data() {
    return {
      headline: null,
      body: null,
      chips: ['test'],
      items: ['Streaming', 'Eating', 'Dog', 'Eat']
    }
  },
  methods: {
    createEntry() {
      this.dialog = false
      let entry = {
        headline: this.headline,
        body: this.body,
        uuid: data.makeHash(this.body, this.headline),
        timestamp: String(Math.floor(new Date() / 1000)),
        upvotes: 0,
        downvotes: 0
      }
      data.insertNew(entry, uuid => {
        this.$router.push({
          name: "DetailPage",
          params: { id: uuid }
        })
      })
      console.log(entry)
    },
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
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
