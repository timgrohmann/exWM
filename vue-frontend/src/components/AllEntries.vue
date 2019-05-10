<template>
  <div>
    <h1>Alle Beiträge</h1>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex xs12 sm12 md6 lg6>
          <v-card :to="{name: 'DetailPage', params: {id: props.item.uuid}}" style="height:100%">
            <v-card-title>
              <h4>{{props.item.headline}}</h4>
              <v-spacer></v-spacer>
              <h5>
                {{new Date(parseInt(props.item.timestamp)*1000)
                .toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}}
              </h5>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>{{previewBody(props.item.body)}}</v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import db from "../data"
import marked from "marked"

export default {
  name: "AllEntries",

  data: () => ({
    pagination: {
      rowsPerPage: 6
    },
    rowsPerPageItems: [6, 12, 24],

    items: []
  }),
  methods: {
    previewBody(p) {
      let demarked = marked(p).replace(/<[^>]*>/g, "")

      if (demarked.length < 300) {
        return demarked
      } else {
        return demarked.slice(0, 300) + "…"
      }
    }
  },
  mounted() {
    db.getAll((err, data) => {
      if (err) {
        console.error("Error while scanning database:", err)
      } else {
        this.items = data
      }
    })
  }
}
</script>

<style scoped>
</style>
