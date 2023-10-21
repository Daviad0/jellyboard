<template>
  <div class="color-picker">
    <button class="color-button" id="red" @click="setColor('red')">red</button>
    <button class="color-button" id="blue" @click="setColor('blue')">blue</button>
    <button class="color-button" id="green" @click="setColor('green')">green</button>
    <button class="color-button" id="yellow" @click="setColor('yellow')">yellow</button>
    <button class="draw-button" id="draw" @click="setDrawingMode(true)">draw</button>
    <button class="erase-button" id="erase" @click="setDrawingMode(false)">erase</button>
  </div>
</template>


<script>
    export default {
            data() {
                return {
                    canvas: null,
                    ctx: null,
                    drawingMode: true,
                    pos: { x: 0, y: 0 },
                    color: "red",
                };
            },
            mounted() {
                // create canvas element and append it to the component's element
                this.canvas = document.createElement('canvas');
                this.canvas.id = "drawingarea";
                this.$el.appendChild(this.canvas);
        
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
                    this.ctx.canvas.width = window.innerWidth;
                    this.ctx.canvas.height = window.innerHeight;
                },
                setColor(c) {
                    this.color = c;
                },
                handleMouse(e) {
                    if (this.drawingMode) {
                        this.draw(e);
                    } else {
                        this.draw(e, true);
                    }
                },
                draw(e, erase=false) {
                    if (e.buttons !== 1) return;
        
                    this.ctx.beginPath();
                    this.ctx.lineWidth = 5;
                    this.ctx.lineCap = 'round';
                    if (erase) {
                        this.ctx.strokeStyle = "white";
                    } else {
                        this.ctx.strokeStyle = this.color;
                    }
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
    };
</script>

