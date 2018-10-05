window.addEventListener("load", function(){
	if(sessionStorage.getItem('timestamp')) { 
		var oldTimestamp = sessionStorage.getItem('timestamp'); 
        var newTimestamp = Math.round(new Date().getTime() / 1000); 
        var deltaTimestamp = newTimestamp - oldTimestamp; 
        console.log(deltaTimestamp); 
    	
    	if (deltaTimestamp > (20 * 60)) { 

    		sessionStorage.clear(); 
    	} else { 
    		var minutes = Math.floor(((20 * 60) - deltaTimestamp) / 60); 
        	var secondes = Math.round((20 - minutes) * 60 - deltaTimestamp); 
        	compteur = evenement.initChrono(minutes, secondes); 
        } 
	}
});

window.addEventListener("load", function(){
    if (sessionStorage.getItem('nameStation')) {
        evenement.reservation.style.backgroundColor = 'blue';
        evenement.reservationDiv.style.textAlign = 'center';
        evenement.reservationDiv.style.fontSize = '20px';
        evenement.reservationDiv.style.color = 'white';
        evenement.reservationDiv.textContent = 'Votre vélo a bien été réservé dans la station ' + sessionStorage.getItem('nameStation') + '.';
    }
});