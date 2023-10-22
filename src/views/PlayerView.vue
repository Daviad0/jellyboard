
<template>
    <div v-if="view == 'home'">
        <PlayerJoin/>
    </div>
    <div v-if="view == 'play'">
        <PlayerPlay/>
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
                socket: undefined,
                currentState: undefined,
                view: "play"
            }
        },

        mounted(){
           
            
            
            
            
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
            }
        }
    }
</script>