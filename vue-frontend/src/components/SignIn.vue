<template>
  <v-card v-if="!loggedIn">
    <v-card-title>
      <div class="headline">Anmelden</div>
    </v-card-title>
    <v-card-text>Hier wird man sich anmelden können:</v-card-text>
    <LoginDialogue v-on:login-success="loggedIn = true"></LoginDialogue>
  </v-card>
  <v-card v-else>
    <v-card-title>
      <div class="headline">Du bist angemeldet!</div>
    </v-card-title>
    <v-card-text>{{username}}</v-card-text>
    <v-btn @click="signOut">Abmelden</v-btn>
  </v-card>
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
    LoginDialogue: LoginDialogue
  },
  data: () => {
    return {
      username: "",
      loggedIn: false
    }
  },
  mounted() {
    let user = auth.getCognitoUser()
    if (user) {
      this.loggedIn = true
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
    }
  }
})
</script>
