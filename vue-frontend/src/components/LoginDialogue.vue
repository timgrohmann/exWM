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
              <v-text-field label="Nutzername" required v-model="username" prepend-icon="person"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Passwort"
                type="password"
                required
                v-model="password"
                prepend-icon="lock"
                :error="passwordIncorrect"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="text-xs-right">
              <v-btn
                color="primary darken-1"
                flat
                @click="dialog = false"
                :disabled="inProgress"
              >Zurück</v-btn>
              <v-progress-circular v-if="inProgress" indeterminate color="secondary darken-1"></v-progress-circular>
              <v-btn
                color="secondary darken-1"
                type="submit"
                depressed
                @click="signIn"
                :disabled="inProgress"
              >Anmelden</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-text v-else>
        <v-alert :value="true" type="info" outline>Du bist bereits angemeldet!</v-alert>
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
      loggedIn: auth.isLoggedIn(),
      passwordIncorrect: false,
      inProgress: false
    }
  },
  watch: {
    password() {
      this.passwordIncorrect = false
    }
  },
  methods: {
    signIn() {
      this.inProgress = true
      auth.signIn(this.username, this.password, error => {
        if (error) {
          console.log("AUTHENTICATION ERROR", error)
          this.$emit("login-error")
          this.passwordIncorrect = true
        } else {
          console.log(auth.getCognitoUser())
          this.$emit("login-success")
          this.dialog = false
        }
        this.inProgress = false
      })
    }
  }
})
</script>
