<template>
  <div>
    <v-navigation-drawer app v-model="visible">
      <v-list>
        <v-list-tile v-for="item in items" :key="item.name">
          <v-list-tile-action>
            <v-icon color="secondary">{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon @click="visible = !visible"/>
      <v-toolbar-title>&exist;WM</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: "home", name: "Test" },
      { icon: "search", name: "Test 2" }
    ],
    visible: false
  })
};
</script>

<style>
</style>
