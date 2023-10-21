<template>
    <section id="buttons">
        <button type="button" @click="setDrawingMode(true)">DRAW :0</button>
        <button type="button" @click="setDrawingMode(false)">ERASE ;_;</button>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                canvas: null,
                ctx: null,
                drawingMode: true,
                pos: { x: 0, y: 0 },
            };
        },
        mounted() {
            // create canvas element and append it to the component's element
            this.canvas = document.createElement('canvas');
            this.$el.appendChild(this.canvas);
    
            // some hotfixes... ( ≖_≖)
            this.$el.style.margin = 0;
            this.canvas.style.position = 'fixed';
    
            // get canvas 2D context and set the correct size
            this.ctx = this.canvas.getContext('2d');
            this.resize();
    
            window.addEventListener('resize', this.resize);
            document.addEventListener('mousemove', this.handleMouse);
            document.addEventListener('mousedown', this.setPosition);
            document.addEventListener('mouseenter', this.setPosition);
    
            // Listen for number keys to toggle between drawing and erasing
            document.addEventListener('keydown', this.toggleMode);
        },
        methods: {
            setPosition(e) {
                const rect = this.canvas.getBoundingClientRect();
                this.pos.x = e.clientX - rect.left;
                this.pos.y = e.clientY - rect.top;
            },
            resize() {
                this.ctx.canvas.width = this.$el.clientWidth;
                this.ctx.canvas.height = this.$el.clientHeight;
            },
            handleMouse(e) {
                if (this.drawingMode) {
                    this.draw(e);
                } else {
                    this.erase(e);
                }
            },
            draw(e) {
                if (e.buttons !== 1) return;
    
                this.ctx.beginPath();
                this.ctx.lineWidth = 5;
                this.ctx.lineCap = 'round';
                this.ctx.strokeStyle = '#c0392b';
                this.ctx.moveTo(this.pos.x, this.pos.y);
                this.setPosition(e);
                this.ctx.lineTo(this.pos.x, this.pos.y);
                this.ctx.stroke();
            },
            erase(e) {
                this.ctx.beginPath();
                this.ctx.lineWidth = 5;
                this.ctx.lineCap = 'round';
                this.ctx.strokeStyle = 'white';
                this.ctx.moveTo(this.pos.x, this.pos.y);
                this.setPosition(e);
                this.ctx.lineTo(this.pos.x, this.pos.y);
                this.ctx.stroke();
            },
            toggleMode(e) {
                if (e.key === '1') {
                    this.setDrawingMode(true);
                } else if (e.key === '2') {
                    this.setDrawingMode(false);
                }
            },
            setDrawingMode(mode) {
                this.drawingMode = mode;
            },
    },
        resize() {
    // Increase the canvas size to make it bigger
    const scaleFactor = 1.5; // You can adjust this value as needed
    this.ctx.canvas.width = this.$el.clientWidth * scaleFactor;
    this.ctx.canvas.height = this.$el.clientHeight * scaleFactor;
}
};

</script>