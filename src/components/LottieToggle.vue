<template>
    <lottie-player
    mode="normal"
    :src="src" ref="lottie" style="cursor: pointer;"  @click="toggle">
    </lottie-player>
</template>
<script>
    export default {
        name: "LottieToggle",
        props: {
            src: String,
            loop: Boolean
        },
        data(){
            return {
                toggled: false
            }
        },
        methods: {
            toggle(){
                if(this.toggled){
                    this.$refs.lottie.setDirection(-1);
                    this.$refs.lottie.play();
                    this.toggled = false;
                }else{
                    this.$refs.lottie.setDirection(1);
                    this.$refs.lottie.play();
                    this.toggled = true;
                }
                
            }
        }
    }
</script>