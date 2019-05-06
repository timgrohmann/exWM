<template>
  <div>
    <v-data-iterator
      :items=items
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          light
          flat
        >
          <v-toolbar-title>All Entries.</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item="props">
        <v-flex
          xs12
          sm12
          md6
          lg6
        >
          <v-card :to="{name: 'DetailPage', params: {id: props.item.uuid.S}}">
            <v-card-title><h4>{{props.item.headline.S}}</h4>
              <v-spacer></v-spacer>
              <h5>{{new Date(parseInt(props.item.timestamp.S)*1000)
                .toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric' })}}</h5></v-card-title>
            <v-divider></v-divider>
            <v-card-text>{{props.item.body.S}}</v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
  import db from '../data';

  export default {
    name: "AllEntries",

    data: () => ({
      pagination: {
        rowsPerPage: 6
      },
      rowsPerPageItems: [6, 12, 24],

      items: []


      /*testitems: [
        {
          headline: 'Caesar',
          body: 'in the freezer'
        },
        {
          headline: 'Julius',
          body: 'in the Coolius'
        },
        {
          headline: 'Roman emperor',
          body: 'in the lower temperature'
        },
        {
          headline: 'Nero',
          body: 'sub zero'
        },
        {
          headline: 'Roman',
          body: 'now frozen'
        },
        {
          headline: 'Dictator',
          body: 'in the refrigerator'
        },
        {
          headline: 'Ruler',
          body: 'in a cooler'
        },
        {
          headline: 'JC',
          body: 'in the AC'
        },
        {
          headline: 'Roman bro',
          body: 'now at 15 below'
        },
        {
          headline: 'Leader',
          body: 'wants a heater'
        },
        {
          headline: 'Boss\'s',
          body: 'not hot'
        }
      ]*/
    }),
    mounted() {
      db.getAll((err, data) => {
        if (err) {
          console.error("Error while scanning database:", err)
        } else {
          this.items = data.Items
        }
      })
    }
  };
</script>

<style scoped>

</style>
