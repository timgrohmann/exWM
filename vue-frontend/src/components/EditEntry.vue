<template>
  <div>
    <h1>Eintrag berarbeiten</h1>
     <v-text-field placeholder="Überschrift" v-model="item.headline" solo></v-text-field>
    <v-textarea
      placeholder="Beitragstext"
      v-model="item.body"
      solo
    ></v-textarea>
    <div class="text-xs-center">
      <v-btn large color="primary" v-on:click="updateEntry">Aktualisieren</v-btn>
    </div>
  </div>
</template>

<script>
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
	     item: {},
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
        console.log(data)
        this.item = data
      })
    },
    updateEntry() {
      data.updateEntryText(this.item, this.item.headline, this.item.body, err => {
        if (err) {
          console.log(err)
        }
      })
      this.$router.push({name: 'DetailPage', params: {id: this.item.uuid}})
    }
  }
}
</script>
