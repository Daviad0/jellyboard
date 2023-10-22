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
            loop: Boolean,
            begin: Boolean
        },
        data(){
            return {
                toggled: false
            }
        },
        mounted(){
            this.toggled = this.$props.begin == undefined ? false : this.$props.begin;
            setTimeout(() => {
                this.$refs.lottie.setDirection(this.toggled ? 1 : -1);
                this.$refs.lottie.play();
            }, 100)
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