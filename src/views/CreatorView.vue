<script setup>
import CreatorItem from '../components/CreatorItem.vue'
</script>
<template>
    
    <div class="creatorView center-align">
        <div v-if="currentView == 'create'" class="showAnim">
            <!--

                THIS IS CREATION INITIAL VIEW
            -->
            <div style="position: absolute;left:10px;top:200px;" v-if="this.currentState.players != undefined">
                <div class="jellybg showAnim" style="width:250px;padding:10px;border-radius: 16px;">
                    <h2 class="white center-align" style="margin:4px;margin-bottom: 10px;">Who's In?</h2>
                    <div class="center-align">
                        <div v-for="player in this.currentState.players" class="whitebg apart-align" style="margin:4px;padding:4px 6px;border-radius: 8px;width:100px">
                            <h5 class="jelly" style="margin:0px;text-wrap:nowrap;text-overflow: ellipsis;">{{ player.username }}</h5>
                            <h4 class="jelly" style="margin:0px">x</h4>
                        </div>
                        <div v-if="this.currentState.players.length == 0">
                            <h4 class="white" style="margin:0px;margin-bottom: 10px;"><i>Nobody</i></h4>
                        </div>
                    </div>
                   
                    
                </div>
            </div>
            <!-- <div style="position: absolute;right:20px;bottom:20px;">
                <div class="jellybg showAnim center-align" style="width:160px;height:60px;padding:10px;border-radius: 16px;">
                    
                   <h1 class="white">GO</h1>
                    
                </div>
            </div> -->
            <div class="center-align">
                <div>
                    <div class="center-align">
                        <h1 class = "fade-in" @click="currentView = 'live'">Create a JellyBoard</h1>
                    </div>
                    
                    <CreatorItem :code="this.currentState.code"/>
                </div>
                
            </div>
        </div>
        <div v-if="currentView == 'live'" class="showAnim">
            <div style = "position: absolute; width: 80%; top: 0; left: 0; height: 100px; background-color: #ba1c8d; border-radius: 0 0 40px 0px; display: flex; align-items: center;">
                <h1 style = "padding-left: 20px; color: #eadeda;" class = fade-in-fast>{{ currentState.stateData.started ? currentState.stateData.currentSlide.title : "Moon?" }}</h1>
            </div>
            <div style = "position: absolute; top: 100px; left: 60%;height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 0 0px 20px 20px; background-color: rgb(210, 197, 193);padding:0px 20px">
                <h2 @click="currentView = 'create'">{{ currentState.stateData.started ? currentState.stateData.interaction.type : "Submission" }}</h2>
            </div>
            

            <div v-if="this.currentState.stateData.currentSlide.type == 'short_answer'" :key="summarizedAnswers">
                <div v-for="(item, index) in Object.keys(this.useAnswerData)" style="position: absolute;" :style="`top:${this.useAnswerData[item].y}%;left:${this.useAnswerData[item].x}%;z-index:20`">
                    <div class = submission-box>
                        <h3 style="margin:0px" :style="`font-size:${this.useAnswerData[item].size}px`">{{ this.useAnswerData[item].answer }}</h3>
                    </div>
                </div>
            </div>

            <div v-if="this.currentState.stateData.currentSlide.type == 'drawing'" :key="summarizedAnswers">
                <div v-for="(item, index) in Object.keys(this.useAnswerData)" style="position: absolute;" :style="`top:${this.useAnswerData[item].y}%;left:${this.useAnswerData[item].x}%;z-index:20`">
                    <img :src="this.useAnswerData[item].answer" style="width:80px"/>
                </div>
            </div>

            


            <div class = submission-box-count style = "position: relative;">
                <h3>3.14</h3>   <div style = "position: absolute; right: 0px;"><p>7</p></div>
            </div>


            <div class = "multi-select showAnim" v-if="this.currentState.stateData.currentSlide.type == 'multiple_select'">

                <div class = "multi-option" v-for="(item, index) in Object.keys(this.useAnswerData).sort((a,b) => this.useAnswerData[b] - this.useAnswerData[a])"><h3 class="white jellybg">{{ item }}</h3>   <h2>{{ this.useAnswerData[item] }}%</h2></div>
                
            </div>



            <div v-if="this.currentState.stateData.currentSlide.type == 'multiple_choice'"  class = "pie showAnim" style = "position: relative; width: 500px; height: 500px;">
                <div class = "pie-chart transition" :style="getPieChartStyleData()" :key="summarizedAnswers">
                    <div class = pie-hole></div>
                </div>

                <div class = pie-key style = "position: absolute; top: 50%; left: 50%; z-index: 4;transform: translate(-50%, -50%);">

                <Strong :style="`background-color:${this.colors[index]}`" style = " color: black;" v-for="(item, index) in Object.keys(this.useAnswerData)">{{ item }}</Strong>
                

                </div>

            </div>
            


            <div :style="slideMenuOpen ? `max-height:400px;padding:10px;` : 'max-height:0px;padding:0px 10px;'" class="handleExpand transition" style = "position: absolute; bottom: 70px; left: 0px; background-color: rgb(210, 197, 193); width: 300px;border-radius: 0px 16px 0px 0px;">
                <div @click="selectSlide(slide.id)" v-for="slide in items" style="padding:6px 12px;border-radius: 8px;margin:4px 0px" class="apart-align slideselect transition">
                    <h3 class="jelly" style="margin:0px">{{ slide.title }}</h3>
                    <h4 class="jelly" style="margin:0px"><i>{{ slide.type }}</i></h4>
                </div>
            </div>
            
            <div style = "position: absolute; bottom: 0px; left: 0px; background-color: rgb(210, 197, 193); width: 60%; height: 70px; border-radius: 0 20px 0 0; display: flex; align-items: center;">
                <img @click="slideMenuOpen = !slideMenuOpen" :style="slideMenuOpen ? `transform:rotate(-90deg)` : `transform:rotate(90deg)`" style = "height: 50px;cursor:pointer; margin-right: 20px;" src = "/src/assets/jellyleft.png" class="transition">
                <img @click="prevSlide()" style = "height: 50px;" src = "/src/assets/jellyleft.png">
                <img @click="nextSlide()" style = "height: 50px;" src = "/src/assets/jellyright.png">
                <div>
                    <select id="dropdown" class="jellybg" style = "margin-left: 20px; font-size: 16px;">
                        <option>Voting</option>
                        <option selected>Submission</option>
                        <option>Rating</option>
                    </select>
                </div>
                <div style = "margin-left: 30px; margin-right: 30px;">
                    <p style = "position: relative; font-size: 15px; color: #ba1c8d; padding: 0; margin: 0;">Enable Responses</p>
                    <LottieToggle @toggle="changeEnableToggle($event)" :begin="this.currentState.stateData.interaction.canRespond" :src="'/src/assets/jellymode_toggle_switch.json'" style="width: 80px; height: 40px; margin: auto; paddposition: relative; margin-top: -20px; margin-bottom: -10px;"/>
                </div>
                <img style = "height: 50px; margin-right: 30px;" src = "/src/assets/jellycamera.png">
                <img style = "height: 50px; margin-right: 50px;" src = "/src/assets/jellysettings.png">
                <img style = "height: 50px; margin-right: 10px;" src = "/src/assets/jellyperson.png">
                <p style = "color: black;font-size: 20px; position: relative; margin-top: 60px;">{{ this.currentState.stateData.started ? this.currentState.players.length : 0 }}</p>
            
            </div>
            <div style = "position: absolute; bottom: 70px; left: 0px; " v-if="createNewSlide" class="showAnim">
                <CreatorItem :code="this.currentState.code"/>
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
            colors: ["#ff264a", "#feec1e", "#12CBC4", "#9980FA", "#ff9f1a", "#ff3838"],
            typesOfItems: ["Multiple Choice", "Short Answer", "Multiple Select", "Drawing"],
            currentView: "",
            currentState: {
                players: [],
                stateData: {
                    started: false,
                    currentSlide: undefined,
                    interaction:{
                        canRespond: false,
                        type: undefined,
                    },
                    answers: {}
                }
            },
            useAnswerData: {},
            answerConcurrency: 0,
            summarizedAnswers: 0,
            createNewSlide: false,
            slideMenuOpen: false
        }
    },
    sockets: {
        host_create_session(data){
            const {code} = data;
            this.$cookies.set("host_code", code);
            this.currentView = 'create';
            this.currentState.code = code;
        },
        host_control_session(data){
            const {valid, code, stateData, players, slides} = data;

            if(valid){
                this.$cookies.set("host_code", code);
                this.currentState.players = players;
                this.currentState.code = code;
                this.currentState.stateData = stateData;
                this.items = slides;
                if(stateData.started){
                    this.currentView = 'live';
                }else{
                    this.currentView = 'create';
                }
                this.summarizeAnswers();
            }
            else{
                this.$cookies.remove("host_code");
                this.currentState.code = undefined;
                this.$socket.emit("host_create_session");
            }
        },
        host_update_players(data){
            const {players} = data;
            this.currentState.players = players;
        },
        host_add_slide(data){
            const {slide} = data;
            this.items.push(slide);

            if(this.currentView == 'create'){
                this.currentView = 'live';

                this.currentState.stateData.started = true;
                this.currentState.stateData.currentSlide = slide;
                this.currentState.stateData.answers = {};
                this.currentState.stateData.interaction.canRespond = true;
                this.currentState.stateData.interaction.type = "submission";

                this.$socket.emit("host_update_state", {code: this.currentState.code, stateData: this.currentState.stateData});
                
            }else{
                this.createNewSlide = false;
                this.currentState.stateData.currentSlide = slide;
                this.currentState.stateData.answers = {};
                this.answerConcurrency++;
                this.useAnswerData = {};
                this.summarizedAnswers = 0;
                this.currentState.stateData.interaction.canRespond = true;
                this.currentState.stateData.interaction.type = "submission";
                this.$socket.emit("host_update_state", {code: this.currentState.code, stateData: this.currentState.stateData});
            }

            

        },
        host_update_answers(data){
            const {answers} = data;
            this.currentState.stateData.answers = answers;
            this.answerConcurrency++;
            
        }
    },
    mounted(){
        var code = this.$cookies.get("host_code");
        if(code != undefined){
            this.$socket.emit("host_control_session", {code: code});
            
        }
        else
            this.$socket.emit("host_create_session");
        
        
        setInterval(function(){
            if(this.answerConcurrency > 0){
                this.answerConcurrency = 0;
                this.summarizeAnswers();
            }
        }, 2000);

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
        prevSlide(){
            console.log(this.items);
            var currentSlideIndex = this.items.indexOf(this.items.find((item) => item.id == this.currentState.stateData.currentSlide.id));
            if(currentSlideIndex > 0){

                this.currentState.stateData.currentSlide.answers = this.currentState.stateData.answers; 
                this.items[currentSlideIndex] = this.currentState.stateData.currentSlide;

                this.currentState.stateData.currentSlide = this.items[currentSlideIndex-1];
                this.currentState.stateData.answers = this.currentState.stateData.currentSlide.answers;
                this.answerConcurrency++;
                this.useAnswerData = {};
                this.summarizedAnswers = 0;
                if(this.currentState.stateData.answers == undefined){
                    this.currentState.stateData.answers = {};
                }else{
                    this.summarizeAnswers();
                }
                
                
                this.currentState.stateData.interaction.canRespond = true;
                this.currentState.stateData.interaction.type = "submission";
                this.$socket.emit("host_update_state", {code: this.currentState.code, stateData: this.currentState.stateData});
            }
        },
        nextSlide(){
            var currentSlideIndex = this.items.indexOf(this.items.find((item) => item.id == this.currentState.stateData.currentSlide.id));
            if(currentSlideIndex < this.items.length-1){
                this.currentState.stateData.currentSlide.answers = this.currentState.stateData.answers; 
                this.items[currentSlideIndex] = this.currentState.stateData.currentSlide;

                this.currentState.stateData.currentSlide = this.items[currentSlideIndex+1];
                this.currentState.stateData.answers = this.currentState.stateData.currentSlide.answers;
                this.answerConcurrency++;
                this.useAnswerData = {};
                this.summarizedAnswers = 0;
                if(this.currentState.stateData.answers == undefined){
                    this.currentState.stateData.answers = {};
                }else{
                    this.summarizeAnswers();
                }
                this.currentState.stateData.interaction.canRespond = true;
                this.currentState.stateData.interaction.type = "submission";
                this.$socket.emit("host_update_state", {code: this.currentState.code, stateData: this.currentState.stateData});
            }else{
                // we need to prompt to create a new slide
                this.createNewSlide = true;
            }
        },
        selectSlide(id){

            this.currentState.stateData.currentSlide.answers = this.currentState.stateData.answers; 
            this.items[this.items.indexOf(this.items.find((item) => item.id == this.currentState.stateData.currentSlide.id))] = this.currentState.stateData.currentSlide;

            this.currentState.stateData.currentSlide = this.items.find((item) => item.id == id);
            this.currentState.stateData.answers = this.currentState.stateData.currentSlide.answers;
            this.answerConcurrency++;
            this.useAnswerData = {};
            this.summarizedAnswers = 0;
            if(this.currentState.stateData.answers == undefined){
                this.currentState.stateData.answers = {};
            }else{
                this.summarizeAnswers();
            }
            this.currentState.stateData.interaction.canRespond = true;
            this.currentState.stateData.interaction.type = "submission";
            this.$socket.emit("host_update_state", {code: this.currentState.code, stateData: this.currentState.stateData});
        },
        getPieChartStyleData(){
            
            
            var style = "background: repeating-conic-gradient(from 0deg,";
            var prevDegree = 0;
            Object.keys(this.useAnswerData).forEach((key, index) => {
                var color = this.colors[index];
                var percent = this.useAnswerData[key];
                style += `${color} calc(3.6deg * ${prevDegree}) calc(3.6deg * ${percent+prevDegree}),`;
                prevDegree += percent;
            })
            style = style.substring(0, style.length - 1);
            style += ");";
            console.log(style);
            return style;
        },
        summarizeAnswers(){
            var answers = this.currentState.stateData.answers;
            var summary = {};
            Object.keys(answers).forEach((key) => {
                var answer = answers[key];
                if(this.currentState.stateData.currentSlide.type == "multiple_choice"){
                    if(summary[answer] == undefined){
                        summary[answer] = 1;
                    }else{
                        summary[answer]++;
                    }
                }else if(this.currentState.stateData.currentSlide.type == "multiple_select"){
                    answer.forEach((choice) => {
                        if(summary[choice] == undefined){
                            summary[choice] = 1;
                        }else{
                            summary[choice]++;
                        }
                    })
                }else if(this.currentState.stateData.currentSlide.type == "short_answer" || this.currentState.stateData.currentSlide.type == "drawing"){
                    if(answer != ""){
                        summary[key] = answer;
                    }else{
                        summary[key] = undefined;
                    }
                }
            })
            
            
            if(this.currentState.stateData.currentSlide.type == 'multiple_choice'){
                this.useAnswerData = {

                }
                var allAnswers = Object.keys(answers).length;
                this.currentState.stateData.currentSlide.additionalData.choices.forEach((choice, index) => {
                    this.useAnswerData[choice] = summary[index+1] == undefined ? 0 : summary[index+1];
                    if(allAnswers > 0){
                        this.useAnswerData[choice] = Math.round((this.useAnswerData[choice] / allAnswers) * 100);
                    }
                });
            }else if(this.currentState.stateData.currentSlide.type == 'multiple_select'){
                this.useAnswerData = {

                }
                var allAnswers = Object.keys(answers).length;
                this.currentState.stateData.currentSlide.additionalData.choices.forEach((choice, index) => {
                    this.useAnswerData[choice] = summary[index+1] == undefined ? 0 : summary[index+1];
                    if(allAnswers > 0){
                        this.useAnswerData[choice] = Math.round((this.useAnswerData[choice] / allAnswers) * 100);
                    }
                });
            }else if(this.currentState.stateData.currentSlide.type == 'short_answer' || this.currentState.stateData.currentSlide.type == 'drawing'){
                var previousRandom = this.useAnswerData;
                Object.keys(summary).forEach((key) => {
                    if(summary[key] == undefined){
                        return;
                    }
                    if(previousRandom[key] == undefined){
                        var tries = 50;
                        while(tries > 0){
                            this.useAnswerData[key] = {
                                answer: summary[key],
                                x: Math.random() * 80+10,
                                y: Math.random() * 60+10,
                                size: Math.floor(Math.random() * 20 + 10)
                            }

                            // check if it's too close to another answer
                            var tooClose = false;
                            Object.keys(previousRandom).forEach((key2) => {
                                if(previousRandom[key2] == undefined){
                                    return;
                                }
                                var xDiff = Math.abs(this.useAnswerData[key].x - previousRandom[key2].x);
                                var yDiff = Math.abs(this.useAnswerData[key].y - previousRandom[key2].y);
                                if(xDiff < 5 && yDiff < 5){
                                    tooClose = true;
                                }
                            })
                            if(!tooClose){
                                break;
                            }
                            tries--;
                        }
                        
                    }else{
                        this.useAnswerData[key] = previousRandom[key];
                        this.useAnswerData[key].answer = summary[key];
                    }
                })
            }

            console.log(this.useAnswerData);
            this.summarizedAnswers += 1;
        
        },
        changeEnableToggle(toggled){
            console.log("TOGGLE", toggled)
            this.currentState.stateData.interaction.canRespond = toggled;
            this.$socket.emit("host_update_state", {code: this.currentState.code, stateData: this.currentState.stateData});
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