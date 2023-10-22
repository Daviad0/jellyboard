<script setup>
import CreatorItem from '../components/CreatorItem.vue'
</script>
<template>
    
    <div class="creatorView center-align">
        <div v-if="currentView == 'create'">
            <!--

                THIS IS CREATION INITIAL VIEW
            -->
            <div class="center-align">
                <div>
                    <div class="center-align">
                        <h1 class = "fade-in">Create a JellyBoard</h1>
                    </div>
                    
                    <CreatorItem />
                </div>
                
            </div>
        </div>
        <div v-if="currentView == 'live'">
            <div style = "position: absolute; width: 80%; top: 0; left: 0; height: 100px; background-color: #ba1c8d; border-radius: 0 0 40px 0px; display: flex; align-items: center;">
                <h1 style = "padding-left: 20px; color: #eadeda;" class = fade-in-fast>What is the capital of the moon?</h1>
            </div>
            <div style = "position: absolute; width: 10%; top: 100px; left: 65%;height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 0 0px 20px 20px; background-color: rgb(210, 197, 193);">
                <h2 @click="currentView = 'create'">Voting</h2>
            </div>

            <div style = "position: absolute; bottom: 70px; left: 0px; background-color: #a09997; height: 170px; width: 30%; border-radius: 0 30px 0 0; display: none;">
                <h2 style = "color: white; padding-left: 10px;">Settings</h2>
            </div>
            
            <div style = "position: absolute; bottom: 0px; left: 0px; background-color: rgb(210, 197, 193); width: 55%; height: 70px; border-radius: 0 20px 0 0; display: flex; align-items: center;">
                <img style = "height: 50px;" src = "/src/assets/jellyleft.png">
                <img style = "height: 50px;" src = "/src/assets/jellyright.png">
                <select style = "margin-left: 20px; font-size: 16px;">
                    <option>Voting</option>
                    <option>Submission</option>
                    <option>Rating</option>
                </select>
                <div style = "margin-left: 30px; margin-right: 30px;">
                <p style = "padding: 0; margin: 0;">Enable Answering</p>
                <LottieToggle :src="'/src/assets/jellymode_toggle_switch.json'" style="width: 80px; height: 40px; margin: auto;"/>
                </div>
                <img style = "height: 50px; margin-right: 30px;" src = "/src/assets/jellycamera.png">
                <img style = "height: 50px; margin-right: 50px;" src = "/src/assets/jellysettings.png">
                <img style = "height: 50px; margin-right: 10px;" src = "/src/assets/jellyperson.png">
                <p style = "font-size: 20px;">29</p>
            
            </div>
        </div>
        
        
        
    </div>
    <div style="position: absolute;top: 10px;right:10px;width:200px" v-if="this.currentState.code != undefined">
        <div class="showAnim">
            <div class="center-align">
                <h3 class="jelly" style="margin: 5px 0px;">Join At</h3>
            </div>
            <div class="center-align">
                <div class="slantChangeAnim">
                    <div class="codeview jelly">
                        <h1 style="letter-spacing: 3px;margin:0px">{{this.currentState.code}}</h1>
                    </div>
                    <h5 class="jelly center-align" style="margin: 5px 0px">jellyboard.tech</h5>
                </div>
                
            </div>
        </div>
        
        
        
    </div>
</template>
<script>


export default {
    name: "CreatorView",
    data(){
        return {
            items: [],
            typesOfItems: ["Multiple Choice", "Short Answer", "Multiple Select", "Drawing"],
            currentView: "live",
            currentState: {
                
            }
        }
    },
    sockets: {
        host_create_session(data){
            const {code} = data;
            this.currentState.code = code;
        }
    },
    mounted(){
        this.$socket.emit("host_create_session");
    },
    methods:{
        createItem(type){

            var typeString = "";
            type.split(" ").forEach((word) => {
                typeString += word.toLowerCase() + "_";
            })
            typeString = typeString.substring(0, typeString.length - 1);


            this.items.push({
                id: this.generateId(),
                type: type,
                title: "",
                data: {}
            })
        },
        generateId(){
            // generate a random id
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            

        }
    }
}
</script>