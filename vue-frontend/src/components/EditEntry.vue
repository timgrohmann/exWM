<template>
  <div>
    <h1>Eintrag berarbeiten</h1>
     <v-text-field placeholder="Überschrift" v-model="headline" solo></v-text-field>
    <v-textarea
      placeholder="Beitragstext"
      v-model="body"
      solo
    ></v-textarea>
    <div class="text-xs-center">
      <v-btn large color="primary" v-on:click="updateEntry">Aktualisieren</v-btn>
    </div>
  </div>
</template>

<script>
import db from "../data"

export default {
  props: {
    uuid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
	     headline: "",
	     body: ""
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
      db.findByUUID(this.uuid, (error, data) => {
        console.log(data)
        if (data.Items.length == 1) {
          this.headline = data.Items[0].headline.S
          this.body = data.Items[0].body.S
        }
      })
    },
    updateEntry() {
      let entry = {
        headline: { S: this.headline },
        body: { S: this.body },
        uuid: { S: data.Items[0].uuid.S },
        timestamp: { S: String(Math.floor(new Date() / 1000)) }
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