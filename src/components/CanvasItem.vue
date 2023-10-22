<template>
  <div>
    <div class="center-align">
        <div id="color-picker" class="center-align" style="list-style:none; padding:0;">
            <ul style="list-style:none; padding:0">
                <li><button class="color-button" id="red" @click="setColor('red'); setDrawingMode(true)"></button></li>
                <li><button class="color-button" id="blue" @click="setColor('blue'); setDrawingMode(true)"></button></li>
                <li><button class="color-button" id="green" @click="setColor('green'); setDrawingMode(true)"></button></li>
                <li><button class="color-button" id="yellow" @click="setColor('yellow'); setDrawingMode(true)"></button></li>
                <li><button class="color-button" id="black" @click="setColor('black'); setDrawingMode(true)"></button></li>
                <li><input class="color-button" type="color" id="colorpicker" ref="colorPicker" value="#ff0000"></li>
                <li><button class="erase-button color-button" id="erase" @click="setDrawingMode(false)">erase</button></li>
                <li><img style="object-fit:cover; width: 60px" id="brush" src="/src/assets/jellybrushh.png"></li>
            </ul>
        </div>
        <div style="background-color: white;padding:5px;border-radius: 16px;border: 4px solid #ba1c8d;">
          <div id ="canvas" class="center-align" style="border-radius: 16px;"></div>
        </div>
        
        
    </div>
  
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
                var divElement = document.getElementById("canvas");
                this.canvas = document.createElement('canvas');
                this.canvas.id = "drawingarea";
                divElement.appendChild(this.canvas);
        
                // get canvas 2D context and set the correct size
                this.ctx = this.canvas.getContext('2d');
                this.resize();

                window.addEventListener('resize', this.resize);
                document.addEventListener('mousemove', this.handleMouse);
                document.addEventListener('mousedown', this.setPosition);
                document.addEventListener('mouseenter', this.setPosition);
        
                // Listen for number keys to toggle between drawing and erasing
                document.addEventListener('keydown', this.toggleMode);

                // watch when the color picker changes color
                this.watchColorPicker();
            },
      methods: {

          watchColorPicker() {
                const image = document.getElementById('brush');
                this.$refs.colorPicker.addEventListener("input", () => {
                    this.color = this.$refs.colorPicker.value;
                    this.$refs.colorPicker.style.backgroundColor = this.color;
                    this.setDrawingMode(true);
                    image.style.backgroundColor = this.color;
                });
            },
            setPosition(e) {
                const rect = this.canvas.getBoundingClientRect();
                this.pos.x = e.clientX - rect.left;
                this.pos.y = e.clientY - rect.top;
            },
            resize() {
                this.ctx.canvas.width = 400;
                this.ctx.canvas.height = 400;
            },
            setColor(c) {
                this.color = c;
                this.$refs.colorPicker.value = this.color;
                this.$refs.colorPicker.style.backgroundColor = this.color;
                this.setDrawingMode(true);
                document.getElementById('brush').style.backgroundColor = this.color;
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
                this.ctx.lineWidth = erase ? 50 : 3;
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
                
                this.submitAnswer();
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
            submitAnswer(){
              var dataURL = this.canvas.toDataURL("image/jpeg", 0.1);
              this.$socket.emit("game_submit_answer", {answer: dataURL});

            }
        },
    };
</script>

