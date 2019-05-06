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
    <div class="text-xs-center">
      <v-btn large color="primary" v-on:click="createEntry">Erstellen</v-btn>
    </div>
  </div>
</template>
<script>
import data from "../data"

export default {
  data() {
    return {
      headline: null,
      body: null
    }
  },
  methods: {
    createEntry() {
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
    }
  }
}
</script>
