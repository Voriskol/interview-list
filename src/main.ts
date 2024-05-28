import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDek3ZP6Vt8cEM83jrlMqeBsGB1vJ29fUw',
  authDomain: 'interview-list-ab4a0.firebaseapp.com',
  projectId: 'interview-list-ab4a0',
  storageBucket: 'interview-list-ab4a0.appspot.com',
  messagingSenderId: '127588571019',
  appId: '1:127588571019:web:a2e5aafb0b7aa521fa818e'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('app-menubar', Menubar)

app.mount('#app')
