<template>
<div>
    <h1>Neuen Eintrag erstellen</h1>
    <v-text-field
        label="Überschrift"
        v-model="headline"
        solo
        ></v-text-field>
    <v-textarea
        label="Beitragstext"
        v-model="body"
        hint="Hier den Text für den Beitrag eingeben"
        solo
    ></v-textarea>
    <v-btn large color="primary" v-on:click="createEntry">Erstellen</v-btn>
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
                headline: {'S': this.headline},
                body: {'S': this.body},
                uuid: {'S': data.makeHash(this.body, this.headline)},
                timestamp: {'S': String(Math.floor(new Date() / 1000))}
            }
            data.insertNew(entry)
            console.log(entry)
        }
    }
}
</script>