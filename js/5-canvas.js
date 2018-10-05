var canvasSignature = {

    mouseX: 0,
    mouseY: 0,
    mouseDown: 0,

    touchX: 0,
    touchY: 0,

    lastX: -1,
    lastY: -1,

    enregistrer: document.getElementById('enregistrer'),

	init: function () {

        canvas = document.getElementById('canvas');
		ctx = canvas.getContext("2d");

        // on définit la taille du canvas
        screenwidth = screen.width;

        // style du context
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.addEventListener('mousedown', canvasSignature.on_mouse_down);
        canvas.addEventListener('mousemove', canvasSignature.on_mouse_move);
        canvas.addEventListener('mouseup', canvasSignature.on_mouse_up);


        canvas.addEventListener('touchstart', canvasSignature.on_touch_start);
        canvas.addEventListener('touchmove', canvasSignature.on_touch_move);
        canvas.addEventListener('touchend', canvasSignature.on_touch_end);

        document.getElementById('reset').addEventListener('click', function(){
            canvasSignature.clear_canvas();
         });
        document.getElementById('resa').addEventListener('click', function(){
            canvasSignature.clear_canvas();
        });
    },

    draw: function (ctx, x, y) {

        if (canvasSignature.lastX == -1) {
            canvasSignature.lastX = x;
            canvasSignature.lastY = y;
        }

        // Dessiner une ligne
        ctx.beginPath();

        // Passer par la premiere position
        ctx.moveTo(canvasSignature.lastX, canvasSignature.lastY);

        // Tracer un point jusqu'au curseur
        ctx.lineTo(x, y);

        // Définir l'épaisseur de la ligne et dessiner la ligne
        ctx.stroke();

        ctx.closePath();

        //Mettre à jour la dernière position pour référencer la position actuelle
        canvasSignature.lastX = x;
        canvasSignature.lastY = y;

    },
    
    clear_canvas: function() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
    },

	on_mouse_down: function () {
        canvasSignature.mouseDown = 1;
        canvasSignature.draw(ctx, canvasSignature.mouseX, canvasSignature.mouseY);
    },

	on_mouse_move: function (e) {
        canvasSignature.getMousePos(e);

        if (canvasSignature.mouseDown == 1) {
            canvasSignature.draw(ctx, canvasSignature.mouseX, canvasSignature.mouseY);
        }
    },

	on_mouse_up: function () {
        canvasSignature.mouseDown = 0;

        canvasSignature.lastX = -1;
        canvasSignature.lastY = -1;
    },

    getMousePos: function (e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            canvasSignature.mouseX = e.offsetX;
            canvasSignature.mouseY = e.offsetY;
        } else if (e.layerX) {
            canvasSignature.mouseX = e.layerX;
            canvasSignature.mouseY = e.layerY;
        }
    },
    on_touch_start: function(e) {
        canvasSignature.getTouchPos(e, canvas);

        canvasSignature.draw(ctx, canvasSignature.touchX, canvasSignature.touchY);

    },

    on_touch_move: function (e) {
        e.preventDefault();

        canvasSignature.getTouchPos(e, canvas);

        canvasSignature.draw(ctx, canvasSignature.touchX, canvasSignature.touchY);

    },

    on_touch_end: function (e) {
        e.preventDefault();

        canvasSignature.enregistrer.style.display= 'block';
        canvasSignature.lastX = -1;
        canvasSignature.lastY = -1;

    },

    getTouchPos: function (e, canvas) {
        var rect = canvas.getBoundingClientRect();

        if (!e)
            var e = event;

        if (e.touches) {
            if (e.touches.length == 1) { 
                var touch = e.touches[0];
                canvasSignature.touchX = touch.clientX - rect.left;
                canvasSignature.touchY = touch.clientY - rect.top;
            }
        }
    },


};
canvasSignature.init();