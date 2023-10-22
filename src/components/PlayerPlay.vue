<script setup>
    import MultipleChoiceItem from './MultipleChoiceItem.vue';
    import SubmitAnswerItem from './SubmitAnswerItem.vue';
    import CanvasItem from './CanvasItem.vue';
</script>
<template>
    <div class="playerPlay">
        <div class="center-align showAnim" style="width:100%">
            <div class="jellybg topbar apart-align">
                <h3 class="white" style="margin:4px">{{this.username}}</h3>
                <h3 class="whitebg jelly" style="margin:4px;padding:4px 6px;border-radius: 8px;letter-spacing: 5px;">{{this.code}}</h3>
            </div>
        </div>
        <div style="position: absolute;top:20px;bottom: 0;width:100%" class="center-align showAnim" :key="stateKey">

            <div v-if="!currentState.started">
                <h1 class="jelly center-align">Waiting...</h1>
                <Lottie :src="'/src/assets/jellyloading.json'" :loop="true" style="width:200px;opacity: 0.7;"/>
            </div>
            <div v-if="currentState.started">
                <div v-if="currentState.interaction.type == 'submission' && currentState.interaction.canRespond == true">
                    <h2 class="jelly center-align">{{ currentState.currentSlide.title }}</h2>
                    <div :style="submitted ? 'opacity:0.7' : 'opacity:1'">
                        <div class="center-align showAnim" v-if="currentState.currentSlide.type == 'multiple_choice'">
                            <MultipleChoiceItem :choices="currentState.currentSlide.additionalData.choices"/>
                            
                        </div>
                        <div class="center-align showAnim" v-if="currentState.currentSlide.type == 'multiple_select'">
                            <MultipleChoiceItem :choices="currentState.currentSlide.additionalData.choices" :multiple="true"/>
                            
                        </div>
                        <div class="center-align showAnim" v-if="currentState.currentSlide.type == 'short_answer'">
                            <SubmitAnswerItem />
                            
                        </div>
                        <div class="center-align showAnim" v-if="currentState.currentSlide.type == 'drawing'">
                            <CanvasItem />
                            
                        </div>
                    </div>
                    
                    <div class="center-align" style="width: 100%;margin-top: 20px;">
                        <button @click="this.submitted = !this.submitted" class="button jellybg white" :disabled="currentState.interaction.canRespond == false">{{this.submitted ? "Edit" : "Submit"}}</button>
                    </div>
                </div>
                <div v-if="currentState.interaction.canRespond == false">
                    <h1 class="jelly center-align">Look Up!</h1>
                    <Lottie :src="'/src/assets/jellyloading.json'" :loop="true" style="width:200px;opacity: 0.7;"/>
                </div>
                
            </div>
            
            
            
        </div>
        
    </div>
</template>
<script>
    export default {
        name: "PlayerPlay",
        data(){
            return {
                currentState: {
                    code: undefined,
                    started: false
                },
                stateKey: 0,
                submitted: false
            }
        },
        props:{
            code: String,
            username: String
        },
        
        sockets: {
            game_update_state(data){
                const {resendAnswer} = data;
                this.currentState = data.stateData;
                if(resendAnswer){
                    this.submitted = false;
                    this.$socket.emit("game_my_answer");
                }
                //this.stateKey++;
            }
        },
        mounted(){
            this.$socket.emit("game_ping");
            this.$socket.emit("game_my_answer");
        },
        methods: {
            
        }
    }
</script>