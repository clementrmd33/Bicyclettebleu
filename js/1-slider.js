(function(){
	var slider = {

		nbImages: 3,
		currentImage: 0,
		chrono: null,
		imagesSlider: document.getElementsByName('imageSlider'),
		infoSlider: document.getElementsByName('info'),
		prevSlide: document.getElementById('previous'),
		nextSlide: document.getElementById('next'),
		pauseSlide: document.getElementById('pause'),
		playSlide: document.getElementById('play'),

		init: function(){
			slider.imagesSlider[slider.currentImage].style.display = "inline";

			slider.prevSlide.addEventListener("click", slider.prev);
			slider.nextSlide.addEventListener("click", slider.next);
			slider.pauseSlide.addEventListener("click", slider.pause);
			slider.playSlide.addEventListener("click",slider.play);

			//evenement pour deplacer une image en utilisant les touches directionnelles
			//claier touchedroite 39
			//clavier touchegauche 37
			document.addEventListener("keyup", function(e){
				e.preventDefault();

				var code = e.keyCode;
				if (code==37){
					slider.prev();
				} else if (code==39){
					slider.next();
				}
			});

			chrono = setInterval(function(){

				slider.next();
			},
			4000);
		},

		prev: function(){
			if (slider.currentImage > 0) {
				slider.imagesSlider[slider.currentImage].style.display = "none";
				slider.infoSlider[slider.currentImage].style.display= "none";
				slider.currentImage--;
				slider.imagesSlider[slider.currentImage].style.display = "inline";	
				slider.infoSlider[slider.currentImage].style.display= "inline";
			}
		},

		next: function(){

			if (slider.currentImage < slider.nbImages -1) {
				slider.imagesSlider[slider.currentImage].style.display = "none";
				slider.infoSlider[slider.currentImage].style.display= "none";
				slider.currentImage++;
				slider.imagesSlider[slider.currentImage].style.display = "inline";
				slider.infoSlider[slider.currentImage].style.display= "inline";
			}else{
				slider.imagesSlider[slider.currentImage].style.display = "none";
				slider.infoSlider[slider.currentImage].style.display= "none";
				slider.currentImage = 0;
				slider.imagesSlider[slider.currentImage].style.display = "inline";
				slider.infoSlider[slider.currentImage].style.display= "inline";
			}
		},
		pause: function(){
			clearInterval(chrono);
		},
		
		play: function(){
			chrono = setInterval(function(){
				slider.next();
			},
			4000);
		},
	};

	slider.init();
})();


