<template>
  <div>
    <v-card v-if="!loggedIn">
      <v-card-title>
        <div class="headline">Anmelden</div>
      </v-card-title>
      <v-card-text>Hier wird man sich anmelden können:</v-card-text>
      <login-dialogue v-on:login-success="loggedIn = true"></login-dialogue>
      <v-btn @click="signUp">Neuen Account erstellen</v-btn>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <div class="headline">Du bist angemeldet!</div>
      </v-card-title>
      <v-card-text>{{username}}</v-card-text>
      <v-btn @click="signOut">Abmelden</v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import jwt from "./../authentication/decode-verify-jwt"
import auth from "./../authentication/auth"
import * as AWS from "aws-sdk"
import { constants } from "crypto"
import LoginDialogue from "./LoginDialogue.vue"

export default Vue.extend({
  components: {
    "login-dialogue": LoginDialogue
  },
  data: () => {
    return {
      username: "",
      loggedIn: auth.isLoggedIn()
    }
  },
  mounted() {
    let user = auth.getCognitoUser()
    if (user) {
      this.username = user.getUsername()
    }
  },
  watch: {
    loggedIn() {
      let user = auth.getCognitoUser()
      if (user) {
        this.username = user.getUsername()
      }
    }
  },
  methods: {
    signOut() {
      auth.signOut()
      this.loggedIn = false
    },
    signUp() {
      const domain = "https://exwm.auth.eu-west-1.amazoncognito.com"
      const appClientID = "2k21erv81gk31egkvl79r5umi2"
      const url = window.location.href
        .split("/")
        .slice(0, 3)
        .join("/")
      console.log(url)
      const uri = encodeURI(url)
      window.location.href = `${domain}/signup?response_type=token&client_id=${appClientID}&redirect_uri=${uri}`
    }
  }
})
</script>
