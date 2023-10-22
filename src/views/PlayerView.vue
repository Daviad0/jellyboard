
<template>
    <div v-if="view == 'home'">
        <PlayerJoin/>
        <div ref="already" v-if="potentialJoinData.code != undefined" class="center-align transition" style="position: absolute;bottom: 80px;width:100%;z-index: 20;">
            <div class="whitebg" style="padding:10px;border-radius: 16px;">
                <h3 class="jelly" @click="joinExistingGame" style="margin:0px">{{ potentialJoinData.username }} is already playing in {{ potentialJoinData.code }}. Join?</h3>
            </div>
        </div>
    </div>
    <div v-if="view == 'play'">
        <PlayerPlay :code="joinData.code" :username="joinData.username"/>
    </div>

</template>
<script setup>
    // import socketio client
    // import io from 'socket.io-client';
    import PlayerJoin from '../components/PlayerJoin.vue'
    import PlayerPlay from '../components/PlayerPlay.vue'
</script>
<script>
    export default {
        name: 'PlayerView',
        data(){
            return {
                joinData: {
                    code: undefined,
                    username: undefined
                },
                potentialJoinData: {
                    code: undefined,
                    username: undefined
                },
                socket: undefined,
                currentState: undefined,
                view: "home"
            }
        },
        mounted(){
           
            
            
            var existingJoin = this.$cookies.get("join_info");
            if(existingJoin){
                var [username, code] = existingJoin.split("@");
                this.$socket.emit("home_game_exists", {code: code, username: username});
            }
            else{
                this.view = "home";
            }
            
            
        },
        sockets: {
            home_join(data){
                if(data.valid){
                    try{
                        this.$refs.already.style.opacity = 0;
                    }catch(e){
                        
                    }
                    setTimeout(()=>{
                        this.joinData.code = data.code;
                        this.joinData.username = data.username;
                        this.view = "play";
                    }, 1000);
                    
                }
            },
            home_game_exists(data){
                const {valid, code, username} = data;
                if(valid){
                    this.potentialJoinData.code = code;
                    this.potentialJoinData.username = username;
                }else{
                    this.view = "home";
                    this.$cookies.remove("join_info");
                }

            }
        },
        methods: {

            sio_handle_home(sub, data){
                if(sub == "active_sessions"){
                    // show "Join __ other sessions!"
                }
                else if(sub == "verify_code"){
                    const {valid} = data;
                }
                else if(sub == "join"){
                    const {valid, stateData, message} = data;
                    if(valid){

                    }else{

                    }
                }
            },
            sio_handle_game(sub, data){
                if(sub == "update_state"){

                }
            },
            joinExistingGame(){
                this.$socket.emit("home_join_override", {code: this.potentialJoinData.code, username: this.potentialJoinData.username});
            },
            
        }
    }
</script>