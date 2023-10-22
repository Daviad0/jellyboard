<template>
    <div id="box" style="position: relative;">
        <div style="position: absolute;right:-5px;bottom:-5px;">
            <div class="jellybg center-align" style="width:30px;height:30px;border-radius: 16px;color:white;cursor: pointer;">
                +
            </div>

        </div>
        <section class="center-align" style="width:100%">
            <input placeholder="What's Your Question?" class="inputTitle" type="text"><br>
        </section>

        <div class="center-align">
            <section>        
                <select @change="changeType" name="type" class="jellybg" id="dropdown" ref="type" :value="this.creationData.type">
                    <option value="multiple_choice">Poll / Multiple Choice</option>
                    <option value="multiple_select">Multiple Select</option>
                    <option value="short_answer">Short Answer</option>
                    <option value="drawing">Drawing</option>
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
                    <input @change="editChoice(indexChoice, $event.srcElement.value)" :value="item" :placeholder="`Choice #${index+1}`" type="text" style="margin:0px 5px">
                    <div class="jellybg center-align" style="width:20px;height:20px;border-radius: 16px;color:white;cursor: pointer;">
                        +
                    </div>
                </div>
            </div>
            
            

        </section>
        
    </div>
</template>
<script>
    export default {
        name: "CreatorItem",
        props: {
            type: String,
            title: String
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
                additionalDataKey: 0
                
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
                }else{
                    setTimeout(() => {
                        this.creationData.additionalData.choices = undefined;
                    }, 500)
                    
                }
            },
            editChoice(index, content){
                this.creationData.additionalData.choices[index] = content;
                
            },
            removeChoice(index){
                this.creationData.additionalData.choices.splice(index);
            },
            addChoice(){
                if(this.creationData.additionalData.choices < 6){
                    this.creationData.additionalData.choices.push("");
                }
            }
        }
    }

</script>