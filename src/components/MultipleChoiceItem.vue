<template>
    <div>
        <div class="center-align" style="flex-wrap: wrap;width:350px">
            <div v-for="index in choices.length" style="margin:5px">
                <div class="transition" :class="this.selected.find(a => a == index) ? 'imagebuttonselected' : ''" @click="selectItem(index)">
                    <img class="imagebutton"  :src="`/src/assets/${images[index]}`" style="width:150px" />
                    <div class="center-align">
                        <div class="jellybg white center-align" style="padding:4px 8px;border-radius: 8px;margin-bottom: 10px;">{{ choices[index-1] }}</div>
                    </div>
                    
                </div>
                
            </div>
            <div v-if="choices.length%2 == 1" style="width:150px">

            </div>
        </div>
        
    </div>

    
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: ["jellycircle.png", "jellysquare.png", "jellyheart.png", "jellystar.png", "jellystop.png", "jellytriangle.png"],
        selected: []
      }
    },
    props: {
        choices: Array,
        multiple: Boolean
    },
    methods: {
        selectItem(index){
            console.log(index)
            if(this.multiple){
                if(this.selected.find(a => a == index)){
                    this.selected.splice(this.selected.indexOf(index), 1);
                }else{
                    this.selected.push(index);
                }
            }else{
                if(this.selected.find(a => a == index)){
                    this.selected = [];
                }else{
                    this.selected = [index];
                }
            }

            this.submitAnswer();
        },
        sockets:{
            game_your_answer(data){
                const {answer} = data;
                if(this.multiple)
                    this.selected = answer;
                else
                    this.selected = [answer];
            }
        },
        submitAnswer(){

            this.$socket.emit("game_submit_answer", {answer: this.multiple ? this.selected : this.selected[0]});
        }
    }
  };
  </script>