<template>

    <body>
        <div class = "playerJoin">
            <img class="logo" src = "/src/assets/jellylogo.png" title="jellyboard logo">
            <div ref="main" class = "join transition">
                <h1 class = "fade-in">Join A JellyBoard</h1>
                <div class = "center-align">
                    <input @change="attemptCode" :class="code ? 'codedone' : ''" ref="code" placeholder = "JELLY" maxlength="5" style = "display:inline-block;">
                    <input v-on:keydown.enter="attemptJoin" :style="code ? 'max-width:100vw' : 'max-width:0px;margin-left:0px;opacity:0;padding:0px'" class="username" ref="username" placeholder = "Username" maxlength="20" style = "display:inline-block;">
                </div>
                <p :class="error != undefined ? '' : 'hidden'">{{ error }}</p>

            </div>

            <div ref="bottom" class = "foot transition" width = 100%>
                <img src = "/src/assets/jellyfooter.png">
            </div>
            <div class = "login">
                <a href = ""><p>Login or sign up here!</p></a>
            </div>
        </div>

        

    </body>


</template>
<script>

export default {
    name: 'PlayerJoin',
    data(){
        return {
            code: undefined,
            username: undefined,
            error: undefined
        }
    },
    methods: {
        attemptCode(){
            var code = this.$refs.code.value;
            if(code.length == 5)
                this.$socket.emit("home_verify_code", {code: code});
            else
                this.code = undefined;
        },
        attemptJoin(){
            var username = this.$refs.username.value;
            if(username.length > 0)
                this.$socket.emit("home_join", {code: this.code, username: username});
            else
                this.username = undefined;
        }
    },
    mounted(){
        this.$socket.emit("ping");
    },
    sockets: {
        home_verify_code(data){
            
            if(data.valid){
                this.code = data.code;
                this.error = undefined;
            }else{
                this.code = undefined;
                this.error = "Code is invalid!"
            }
        },
        home_join(data){
            if(data.valid){
                this.code = data.code;
                this.username = data.username;
                this.error = undefined;

                this.$refs.main.style.opacity = 0;
                this.$refs.bottom.style.transform = "translateY(700px)";

                this.$cookies.set("join_info", this.username + "@" + this.code);

            }else{
                this.username = undefined;
                this.error = "Username is invalid!";
            }
        },
        home_active_sessions(data){
            alert("ThERE ARE " + data + " ACTIVE SESSIONS")
            console.log(data);
        }
    }
    
}
</script>