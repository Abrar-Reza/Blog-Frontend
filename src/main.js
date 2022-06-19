import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'


axios.defaults.baseURL = 'https://blog-backend.azurewebsites.net/api/'

const app = createApp(App)

app.use(createPinia())
app.use(router, axios)

app.mount('#app')