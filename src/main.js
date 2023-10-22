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
// import VueSocketIO from 'vue-socket.io';

// export const SocketInstance = socketio('http://localhost:3000');

const app = createApp(App)

app.use(new VueSocketIO({
    debug: true,
    connection: 'https://api.jellyboard.tech',
    options: { path: "/live" }
}));
app.use(VueCookies)

app.component("Lottie", Lottie);
app.component("LottieToggle", LottieToggle);
app.component("LottieButton", LottieButton);

// app.use(new VueSocketIO({
//     connection: 'http://localhost:3000',
//     withCredentials: false
// }));

app.use(router)

app.mount('#app')
    