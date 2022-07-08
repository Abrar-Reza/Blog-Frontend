import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'

// axios.defaults.baseURL = 'https://blog-backend.azurewebsites.net/api/'
axios.defaults.baseURL = 'http://localhost:1337/api/'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router, axios)
app.mount('#app')