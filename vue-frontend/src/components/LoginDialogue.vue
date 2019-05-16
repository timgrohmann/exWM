<template>
  <v-dialog v-model="dialog" :persistent="!loggedIn" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Jetzt anmelden!</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Anmelden</span>
      </v-card-title>
      <v-card-text v-if="!loggedIn">
        <v-form>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Nutername" required v-model="username"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Passwort" type="password" required v-model="password"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" flat @click="dialog = false">Zurück</v-btn>
              <v-btn color="secondary darken-1" type="submit" depressed @click="signIn">Anmelden</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-text v-else>
        <p color="success">Du bist bereits angemeldet!</p>
        <div class="text-xs-right">
          <v-btn color="primary darken-1" flat @click="dialog = false">Zurück</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import auth from "../authentication/auth"

export default Vue.extend({
  data: () => {
    return {
      dialog: false,
      username: "",
      password: "",
      loggedIn: auth.isLoggedIn()
    }
  },
  methods: {
    signIn() {
      auth.signIn(this.username, this.password, error => {
        if (error) {
          console.error("AUTHENTICATION ERROR", error)
        } else {
          console.log(auth.getCognitoUser())
          this.$emit("login-success")
          this.dialog = false
        }
      })
    }
  }
})
</script>
