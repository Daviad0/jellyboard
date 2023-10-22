<template>
    <lottie-player
    mode="normal"
    ref="lottie"
    :style="disabled ? 'cursor:not-allowed' : 'cursor:pointer'"
    :src="src"
    @click="play()">
    </lottie-player>
</template>
<script>
    export default {
        name: "Lottie",
        props: {
            src: String,
            duration: Number,
            disabled: Boolean
        },
        methods: {
            play(){
                this.$refs.lottie.play();
                setTimeout(() => {
                    this.$refs.lottie.stop();
                    this.$emit("done");
                }, this.duration)
            },
            
        }
    }
</script>