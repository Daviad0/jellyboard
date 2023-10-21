import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import socketio from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io';

// export const SocketInstance = socketio('http://localhost:3000');

const app = createApp(App)

// app.use(VueSocketIO, SocketInstance)

app.use(router)

app.mount('#app')
    