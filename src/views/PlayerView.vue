<template>
    <div>

    </div>
    <div>

    </div>
</template>
<script>
    // import socketio client
    import io from 'socket.io-client';

    export default {
        name: 'PlayerView',
        data: {
            joinData: {
                code: undefined,
                username: undefined
            },
            socket: undefined,
            currentState: undefined,

        },
        mounted(){
            this.socket = io('http://localhost:3000', {
                path: '/live'
            });

            this.socket.emit("join");
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
                if(sub == "update_state")
            }
        }
    }
</script>