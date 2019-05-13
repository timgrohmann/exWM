<template>
  <v-card v-if="!loggedIn">
    <v-card-title>
      <div class="headline">Anmelden</div>
    </v-card-title>
    <v-card-text>Hier wird man sich anmelden können:</v-card-text>
    <v-btn @click="signUp">Anmelden</v-btn>
    <v-card-text>{{token}}</v-card-text>
  </v-card>
  <v-card v-else>
    <v-card-title>
      <div class="headline">Du bist angemeldet!</div>
    </v-card-title>
    <v-card-text>{{username}}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue"
import jwt from "./../authentication/decode-verify-jwt"

export default Vue.extend({
  props: {
    token: {
      type: String,
      default: ""
    }
  },
  data: () => {
    return {
      username: "",
      loggedIn: false
    }
  },
  watch: {
    token() {
      this.verify()
    }
  },
  mounted() {
    this.verify()
  },
  methods: {
    signUp() {
      const domain = "https://exwm.auth.eu-west-1.amazoncognito.com"
      const appClientID = "7nqlsl50rmosp3p7c7kcqveli3"
      const uri = encodeURI("http://localhost:8080/")
      window.location.href = `${domain}/login?response_type=token&client_id=${appClientID}&redirect_uri=${uri}`
    },
    verify() {
      if (this.token == "") return
      let tokenParts = this.token.split("&")
      let idToken = tokenParts[0]
      let accessToken = tokenParts[1].split("=")[1]

      jwt.verify(accessToken, (error, payload) => {
        if (error) {
          console.log(error)
        } else {
          this.loggedIn = true
          this.username = payload.username
          console.log(payload)
        }
      })
    }
  }
})
</script>
