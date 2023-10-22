<template>
    <div>
        <div class="center-align" style="flex-wrap: wrap;width:350px">
            <div v-for="index in choices">
                <img  class="imagebutton" :class="this.selected.find(a => a == index) ? 'imagebuttonselected' : ''" @click="selectItem(index)" :src="`/src/assets/${images[index]}`" style="width:150px" />
            </div>
            <div v-if="choices%2 == 1" style="width:150px">

            </div>
        </div>
        <div class="center-align" style="width: 100%;">
            <button class="button jellybg white">Submit</button>
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
        choices: Number,
        multiple: Boolean
    },
    methods: {
        selectItem(index){
            console.log(index)
            if(this.multiple){
                if(index in this.selected){
                    this.selected = this.selected.filter((a) => {
                        a != index
                    })
                }else{
                    this.selected.push(index);
                }
            }else{
                if(index in this.selected){
                    this.selected = [];
                }else{
                    this.selected = [index];
                }
            }
            console.log(this.selected)
        }
    }
  };
  </script>