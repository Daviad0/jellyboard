<template>
    <div id="box" style="position: relative;">
        <div style="position: absolute;right:-5px;bottom:-5px;">
            <div @click="addSlide" class="jellybg center-align transition" :style="validItem ? '' : 'transform:rotate(-45deg);background-color:black'" style="width:30px;height:30px;border-radius: 16px;color:white;cursor: pointer;">
                {{this.validItem ? '+' : '↑' }}
            </div>

        </div>
        <section class="center-align" style="width:100%">
            <input @change="changeTitle" ref="title" placeholder="What's Your Question?" class="inputTitle" type="text"><br>
        </section>

        <div class="center-align">
            <section>        
                <select @change="changeType" name="type" class="jellybg" id="dropdown" ref="type" :value="this.creationData.type">
                    <option value="multiple_choice">Poll / Multiple Choice</option>
                    <option value="multiple_select">Multiple Select</option>
                    <option value="short_answer">Short Answer</option>
                    <option value="drawing">Drawing</option>
                    <option value="highlight">Highlight</option>
                </select>
            </section>

            <!-- <section id="buttons">
                <button type="button" class="jellybg">X</button>
                <button type="button" class="jellybg">↑</button>
                <button type="button" class="jellybg">↓</button>
            </section> -->
        </div>
        
        <section class="handleExpand center-align" :style="this.creationData.type == 'multiple_choice' || this.creationData.type == 'multiple_select' ? 'max-height:100vh;padding:5px 0px' : 'max-height:0px'">
            <div :key="this.additionalDataKey">
                <div class="center-align" v-for="(item,index) in this.creationData.additionalData.choices" style="margin:5px">
                    <img :src="`/src/assets/${images[index]}`" style="width:30px"/>
                    <input v-on:keydown.enter="addChoice()" @change="editChoice(index, $event.srcElement.value)" :value="item" :placeholder="`Choice #${index+1}`" type="text" style="margin:0px 5px">
                    <div @click="removeChoice(index)" class="jellybg center-align" style="width:20px;height:20px;border-radius: 16px;color:white;cursor: pointer;">
                        x
                    </div>
                </div>
                <div class="center-align" style="width: 100%;" v-if="this.creationData.additionalData.choices && this.creationData.additionalData.choices.length < 6">
                    <button @click="addChoice()" class="button jellybg white">Add Choice</button>
                </div>

            </div>
            
            

        </section>

        <section class="handleExpand center-align" :style="this.creationData.type == 'highlight' ? 'max-height:100vh;padding:5px 0px' : 'max-height:0px'">
            <div :key="this.additionalDataKey">
                <textarea style="resize: none;height:100px;width:100%" placeholder="Text to Show">

                </textarea>
               

            </div>
            
            

        </section>

        <section class="handleExpand center-align" :style="this.creationData.type == 'short_answer' ? 'max-height:100vh;padding:5px 0px' : 'max-height:0px'">
            <div :key="this.additionalDataKey">
                

            </div>
            
            

        </section>
        
    </div>
</template>
<script>
    export default {
        name: "CreatorItem",
        props: {
            code: String
        },
        data(){
            return {
                images: ["jellycircle.png", "jellysquare.png", "jellyheart.png", "jellystar.png", "jellystop.png", "jellytriangle.png"], 
                creationData: {
                    type: this.type,
                    title: this.title,
                    additionalData: {
                        
                    }
                },
                additionalDataKey: 0,
                validItem: false
                
            }
        },
        mounted(){
            this.creationData.type = this.$refs.type.value;
        },
        methods: {
            changeType(){
                var newType = this.$refs.type.value;
                this.creationData.type = newType;

                if(newType == 'multiple_choice' || newType == 'multiple_select'){
                    if(this.creationData.additionalData.choices == undefined)
                        this.creationData.additionalData.choices = ["", "", "", ""];
                }else if(newType == 'short_answer'){

                }else{
                    setTimeout(() => {
                        this.creationData.additionalData.choices = undefined;
                    }, 500)
                    
                }
                this.checkIfValid();
            },
            changeTitle(){
                this.creationData.title = this.$refs.title.value;
                this.checkIfValid();
            },
            
            editChoice(index, content){
                this.creationData.additionalData.choices[index] = content;
                this.checkIfValid();
            },
            removeChoice(index){
                this.creationData.additionalData.choices.splice(index,1);
            },
            addChoice(){
                if(this.creationData.additionalData.choices.length < 6){
                    this.creationData.additionalData.choices.push("");
                }
            },
            checkIfValid(){
                if(this.creationData.title == "" || this.creationData.type == "" || this.creationData.title == undefined || this.creationData.type == undefined){
                    this.validItem = false;
                    return;
                }
                if(this.creationData.type == "multiple_choice" || this.creationData.type == "multiple_select"){
                    if(this.creationData.additionalData.choices.length < 2){
                        this.validItem = false;
                        return;
                    }
                    var isThereContent = 0;
                    this.creationData.additionalData.choices.forEach((item) => {
                        if(item != "")
                            isThereContent++;
                    })

                    if(isThereContent < 2){
                        this.validItem = false;
                        return;
                    }
                }

                this.validItem = true;

            },
            addSlide(){
                if(this.validItem){
                    this.$socket.emit("host_add_slide", {code: this.code, slide: this.creationData});
                }
                
            }
        }
    }

</script>