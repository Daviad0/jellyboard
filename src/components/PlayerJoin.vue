<template>

    <body>
        <div class = "playerJoin">
            <img class = "logo" src = "/src/assets/jellylogo.png"> 
            <div class = "join">
                <h1 class = "fade-in">Join A JellyBoard</h1>
                <div class = "center-align">
                    <input @change="attemptJoin" ref="code" placeholder = "JELLY" maxlength="5" style = "display:inline-block;">
                </div>
                <div class = hidden-parent>
                    <p class = hidden>Error: Code not found</p>
                    <p class = hidden>Error: Username already taken</p>
                </div>

            </div>

            <div class = "foot" width = 100%>
                <img src = "/src/assets/jellyfooter.png" width = "100%">
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
    methods: {
        attemptJoin(){
            var code = this.$refs.code.value;
            this.$socket.emit("home_verify_code", {code: code});
        }
    },
    mounted(){
        this.$socket.emit("ping");
    },
    sockets: {
        home_verify_code(data){
            if(data.valid){
                alert("CODE VALID")
            }else{
                alert("CODE INVALID")
            }
        },
        home_join(data){
            if(data.valid){
                alert("JOINED")
            }else{
                alert("ERROR")
            }
        },
        home_active_sessions(data){
            alert("ThERE ARE " + data + " ACTIVE SESSIONS")
            console.log(data);
        }
    }
    
}
</script>