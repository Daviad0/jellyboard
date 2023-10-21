<script setup>
import CreatorItem from '../components/CreatorItem.vue'
</script>
<template>
    <div class="playerJoin">
        <div class="center-align">
            <h1 class = "fade-in">Create a JellyBoard</h1>
        </div>
        <div v-for="item in items" :key="item.id">
            <CreatorItem :type="item.type" :title="item.title"/>
        </div>
        <div class="center-align">
            <div class="bottomMenu jellybg center-align">
                <div class="itemOption whitebg" v-for="itemOption in typesOfItems">
                    {{ itemOption }}
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
        }
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