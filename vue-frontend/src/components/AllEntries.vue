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
          color="primary"
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
          <v-card>
            <v-card-title><h4>{{props.item.headline}}</h4></v-card-title>
            <v-divider></v-divider>
            <v-card-text>{{props.item.body}}</v-card-text>
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
      rowsPerPageItems: [6, 12, 24],
      items: [
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
      ]
    })
  };
</script>

<style scoped>

</style>
