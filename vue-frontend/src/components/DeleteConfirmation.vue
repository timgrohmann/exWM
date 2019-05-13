<template>
  <v-card>
    <v-card-title>
      <div class="headline">Beitrag erfolgreich gelöscht</div>
    </v-card-title>
    <v-card-text v-html="markedHtml"></v-card-text>
    <v-card-actions>
      <v-btn outline color="primary" :to="{name: 'LandingPage'}">
        Zurück zur Übersicht
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
