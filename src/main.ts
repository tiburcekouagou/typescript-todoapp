import './assets/main.css'
import 'todomvc-app-css/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

const vuetify = createVuetify({ components })

const app = createApp(App)

app.use(vuetify)
app.use(router)

app.mount('#app')
