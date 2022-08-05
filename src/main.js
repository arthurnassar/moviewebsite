import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/_typography.scss'
import VueCarousel from 'vue-carousel'

createApp(App).use(store).use(router).use(VueCarousel).mount('#app')
