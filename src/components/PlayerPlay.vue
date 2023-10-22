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
                <div v-if="currentState.interaction.type == 'submission'">
                    <h2 class="jelly center-align">{{ currentState.currentSlide.title }}</h2>
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
                    <div class="center-align" style="width: 100%;margin-top: 20px;">
                        <button class="button jellybg white" :disabled="currentState.interaction.canRespond == false">Submit</button>
                    </div>
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
                stateKey: 0
            }
        },
        props:{
            code: String,
            username: String
        },
        
        sockets: {
            game_update_state(data){
                this.currentState = data.stateData;
                //this.stateKey++;
            }
        },
        mounted(){
            this.$socket.emit("game_ping");
        },
        methods: {
            
        }
    }
</script>