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
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import InlineMessage from 'primevue/inlinemessage'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import InputMask from 'primevue/inputmask'
import Calendar from 'primevue/calendar'
import RadioButton from 'primevue/radiobutton'
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
app.use(ConfirmationService)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-toast', Toast)
app.component('app-progress', ProgressSpinner)
app.component('app-card', Card)
app.component('app-datatable', DataTable)
app.component('app-column', Column)
app.component('app-dialog', ConfirmDialog)
app.component('app-message', InlineMessage)
app.component('app-input-number', InputNumber)
app.component('app-textarea', Textarea)
app.component('app-input-mask', InputMask)
app.component('app-calendar', Calendar)
app.component('app-radio', RadioButton)

app.mount('#app')
