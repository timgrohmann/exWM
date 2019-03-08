<template>
  <div>
    <v-navigation-drawer app :value="visible">
      <v-list>
        <v-list-tile v-for="item in items" :key="item">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{item}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click="visible = !visible"/>
      <v-toolbar-title>ExWM</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["Test", "Test 2"],
    visible: false
  }),

};
</script>

<style>
</style>
