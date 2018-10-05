var evenement = {

  blocCanvas: document.getElementById ('bloc-canvas'),
  clicBouton: document.getElementById('resa'),
  canvasElt: document.getElementById('canvas'),
  descriptionCanvas: document.getElementById('description-canvas'),
  enregistrer: document.getElementById('enregistrer'),
  fermer: document.getElementById('fermer'),
  boutonReset: document.getElementById('reset'),
  stationName: document.getElementById('nom'),
  reservation: document.getElementById('reservation'),
  reservationDiv: document.getElementById('reservation-velib'),
  compteurElt: document.getElementById('compteur'),
  descriptionFenetre: document.getElementById('description-fenetre'),
  minutesElt: document.getElementById('minutes'),
  secondesElt: document.getElementById('secondes'),

  initClick: function(){
    evenement.clicBouton.addEventListener('click', function(){

      evenement.canvasElt.style.display = 'block';
      evenement.canvasElt.style.border = '1px solid black';
      evenement.canvasElt.style.backgroundColor = 'white';

      evenement.blocCanvas.style.display = 'block';

      evenement.descriptionCanvas.style.display = 'block';

      evenement.clicBouton.style.display = 'none';

      evenement.boutonReset.style.display = 'block' ;

      evenement.fermer.style.display = 'block';

      evenement.descriptionFenetre.style.display= 'none';

      window.sessionStorage.setItem('nameStation', evenement.stationName.textContent);

      clearInterval(chrono);
    });
  },

  initCanvasValidation: function(){
    evenement.canvasElt.addEventListener('click', function(){
      evenement.enregistrer.style.display = 'block';
    });
  },

  initClickReset: function(){
    evenement.fermer.addEventListener('click', function(){

      evenement.canvasElt.style.display = 'none';
      evenement.descriptionCanvas.style.display = 'none';
      evenement.enregistrer.style.display = 'none';
      evenement.fermer.style.display = 'none';
      evenement.boutonReset.style.display = 'none';
      evenement.clicBouton.style.display = 'block';
      evenement.descriptionFenetre.style.display= 'block';

    });
  },

  initClickEnregistrer: function(){
    
    evenement.enregistrer.addEventListener('click', function(){
      window.sessionStorage.getItem('nameStation');
      evenement.reservation.style.backgroundColor = 'blue';
      evenement.reservationDiv.style.textAlign = 'center';
      evenement.reservationDiv.style.fontSize = '20px';
      evenement.reservationDiv.style.color = 'white';
      evenement.reservationDiv.textContent = 'Votre vélo a bien été réservé dans la station ' + evenement.stationName.textContent + '.';

      evenement.compteurElt.style.display = 'block';

      evenement.initChrono(20,0);

      var newTimestamp = Math.round(new Date().getTime() / 1000);
      sessionStorage.setItem("timestamp", newTimestamp);


      evenement.blocCanvas.style.display = 'none';

      evenement.descriptionFenetre.style.display = 'block';

      evenement.clicBouton.style.display = 'block';
    });
  },
  initChrono: function(minutes, secondes){

    var min = minutes, sec = secondes;

    chrono = setInterval(function() {
      if (min === 0 && sec === 0) {

        evenement.compteurElt.innerHTML = '';
        evenement.compteurElt.textContent = 'Votre réservation a expirée';

        clearInterval(chrono);
      };

      if (sec === 0) {
        min--;
        sec = 59;
      };
      sec--;

      evenement.minutesElt.innerHTML = '';
      evenement.minutesElt.textContent = ' Votre réservation est valable ' + min + ' minutes ';
      evenement.secondesElt.innerHTML = '';
      evenement.secondesElt.textContent = sec + ' secondes ';
      evenement.compteurElt.style.backgroundColor = 'blue';
      evenement.compteurElt.style.textAlign = 'center';
    },
    1000);
  }
}

evenement.initClick();
evenement.initClickReset();
evenement.initClickEnregistrer();
evenement.initCanvasValidation();