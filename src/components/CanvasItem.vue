<template>
    <section id="buttonplace">
        <button type="button" @click="setColor('red')">DRAW :0</button>
        <button type="button" @click="setColor('blue')">ERASE ;_;</button>
    </section>
</template>

<script>
    export default {
            
            data() {
                return {
                    canvas: null,
                    ctx: null,
                    pos: { x: 0, y: 0 },
                    color: "red",
                };
            },
            mounted() {
                // create canvas element and append it to the component's element
                this.canvas = document.createElement('canvas');
                this.canvas.id = "drawingarea";
                this.$el.appendChild(this.canvas);
        
                // some hotfixes... ( ≖_≖)
                this.$el.style.margin = 0;
        
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
                    this.ctx.canvas.width = 500;
                    this.ctx.canvas.height = 500;
                },
                setColor(c) {
                    this.color = c;
                },
                draw(e) {
                    if (e.buttons !== 1) return;
        
                    this.ctx.beginPath();
                    this.ctx.lineWidth = 5;
                    this.ctx.lineCap = 'round';
                    this.ctx.strokeStyle = this.color;
                    this.ctx.moveTo(this.pos.x, this.pos.y);
                    this.setPosition(e);
                    this.ctx.lineTo(this.pos.x, this.pos.y);
                    this.ctx.stroke();
                },
        },
    };

</script>