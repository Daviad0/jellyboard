<template>
    <div class="login center-align">
        <div class="transition" ref="parent">
            <div v-if="state == 'login'">
                <h2 class="center-align">Login</h2>
                <input placeholder="Username" class="loginArea"/>
                <input placeholder="Password" type="password" class="loginArea"/>
                <h3 class="transition" :style="errorMessage">{{ errorMessage }}</h3>
            </div>
            <div v-if="state == 'register'">
                <h2 class="center-align">Register</h2>
                <input placeholder="Username" class="loginArea"/>
                <input placeholder="Password" type="password" class="loginArea"/>
                <input placeholder="Confirm Password" type="password" class="loginArea"/>
                <h3 class="transition" :style="errorMessage">{{ errorMessage }}</h3>
            </div>
            <div v-if="state == 'account'">
                <h2 class="center-align">Register</h2>
                <input placeholder="Username" class="loginArea"/>
                <input placeholder="Password" type="password" class="loginArea"/>
                <input placeholder="Confirm Password" type="password" class="loginArea"/>
                <h3 class="transition" :style="errorMessage">{{ errorMessage }}</h3>
            </div>
        </div>
    </div>
</template>
<script>

//import { apiGet, apiPost } from '../apiGet.js'

export default {
    name: 'AccountView',
    data(){
        return {
            state: "login",
            errorMessage: undefined
        }
    },
    methods: {
        changeState(state){

            this.$refs.parent.style.opacity = 0;
            setTimeout(() => {
                this.state = state;
                this.$refs.parent.style.opacity = 1;
            }, 510);

            
        },
        // tryLogin(){
        //     apiPost("login", {username: "test", password: "test"}).then((res) => {
        //         console.log(res);
        //     })
        // },
        // tryRegister(){
        //     apiPost("register", {username: "test", password: "test"}).then((res) => {
        //         console.log(res);
        //     })
        // }
    }
}

</script>