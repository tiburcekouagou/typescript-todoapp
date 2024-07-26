<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h2 class="text-center">Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                type="password"
                required
              ></v-text-field>
              <v-btn :disabled="!valid" color="primary" @click="handleLogin"> Login </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <p>
    Vous n'avez pas de compte ?
    <router-link :to="{name: 'register'}">créez un compte</router-link>.
  </p>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/auth'

const valid = ref(false)
const email = ref('')
const password = ref('')

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters'
]

const form = ref()
const { login, user } = useAuth()

async function handleLogin() {
  await login(email.value, password.value)
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
