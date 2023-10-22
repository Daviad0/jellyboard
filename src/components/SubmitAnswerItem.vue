<template>
    <section id="question_field">
        <div class="center-align">
            <input v-on:keyup="submitAnswer()" ref="answer" class="inputTitle" placeholder="What say you?" type="text">
        </div>
            
        
        
    </section>
</template>

<script>

export default {
    name: "SubmitAnswerItem",
    methods: {
        submitAnswer(){
            
            this.$socket.emit("game_submit_answer", {answer: this.$refs.answer.value});
        }
    }
}
</script>