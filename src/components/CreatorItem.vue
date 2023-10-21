<template>
    <div id="box">
        <section>        
            <select name="type" id="dropdown" :value="type">
                <option value="multiple_choice">Poll / Multiple Choice</option>
                <option value="multiple_select">Multiple Select</option>
                <option value="short_answer">Short Answer</option>
                <option value="drawing">Drawing</option>
            </select>
        </section>
        <section id="buttons">
            <button type="button">X</button>
            <button type="button">↑</button>
            <button type="button">↓</button>
        </section>
        <section id="question_field">
            <input placeholder="Type in a question :3 (i'm losing my mind)" type="text"><br>
        </section>
        
    </div>
</template>
<script>
    export default {
        name: "CreatorItem",
        props: {
            type: String,
            title: String
        }
    }

</script>