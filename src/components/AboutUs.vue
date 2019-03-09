<template>
  <v-card>
    <v-card-title>
      <div class="headline">Über uns</div>
    </v-card-title>
    <v-card-text>Diese Seite wird im Rahmen eines Uni-Projektes an der
        <a href="http://www.dhbw-mannheim.de">DHBW Mannheim</a> betrieben.</v-card-text>
    <v-list>
        <v-list-tile v-for="person in people" :key="person.name">
            <v-list-tile-avatar>
                <img :src="person.image_src">
            </v-list-tile-avatar>
            <v-list-tile-title>{{person.name}}</v-list-tile-title>
        </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
        people: [
            {
                name: "Tim Grohmann",
                image_src: "https://avatars3.githubusercontent.com/u/14997424"
            },
            {
                name: "Felix Wortmann",
                image_src: "https://avatars2.githubusercontent.com/u/45035656"
            },
            {
                name: "Florian Redmann",
                image_src: "teammembers/flo_red.jpg"
            }
        ]
    };
  }
};
</script>