<template>
    <lottie-player
    autoplay
    loop
    mode="normal"
    :src="src">
    </lottie-player>
</template>
<script>
    export default {
        name: "Lottie",
        props: {
            src: String,
            loop: Boolean
        }
    }
</script>