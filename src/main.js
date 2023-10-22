import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-3-socket.io'
// use vue cookies
import VueCookies from 'vue3-cookies'
// import socketio from 'socket.io-client';

import Lottie from './components/Lottie.vue'
import LottieToggle from './components/LottieToggle.vue'
import LottieButton from './components/LottieButton.vue'
import CreatorItem from './components/CreatorItem.vue'
// import VueSocketIO from 'vue-socket.io';

const app = createApp(App)

app.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    options: { path: "/live", transports: ['websocket', 'polling'] }
}));
app.use(VueCookies)

app.component("Lottie", Lottie);
app.component("LottieToggle", LottieToggle);
app.component("CreatorItem", CreatorItem);
app.component("LottieButton", LottieButton);


app.use(router)

app.mount('#app')
    