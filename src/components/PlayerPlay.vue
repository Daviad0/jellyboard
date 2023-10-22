<script setup>
    import MultipleChoiceItem from './MultipleChoiceItem.vue';
    import SubmitAnswerItem from './SubmitAnswerItem.vue';
</script>
<template>
    <div class="playerPlay">
        <div class="center-align" style="width:100%">
            <div class="jellybg topbar apart-align">
                <h3 class="white" style="margin:4px">Username</h3>
                <h3 class="whitebg jelly" style="margin:4px;padding:4px 6px;border-radius: 8px;letter-spacing: 5px;">ASJDA</h3>
            </div>
        </div>
        <div style="position: absolute;top:20px;bottom: 0;width:100%" class="center-align">

            <div class="center-align">
                <MultipleChoiceItem :choices="3"/>
                
            </div>
            <Lottie :src="'/src/assets/jellyloading.json'" :loop="true" style="width:200px;opacity: 0.7;"/>
            
        </div>
        
    </div>
</template>
<script>
    export default {
        name: "PlayerPlay"
    }
</script>