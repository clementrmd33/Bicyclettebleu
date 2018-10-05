var velibMap = {
  
  map: document.getElementById('map'),
  urlOpenData: 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=95c10af85c38f00dabf0e6ae84be56666d1c320a',
  nameStation: document.getElementById('nom'),
  statutStation: document.getElementById('statut'),
  adresseStation: document.getElementById('adresse'),
  nbPlacesDispo: document.getElementById('nb_places_dispo'),
  veloDispo: document.getElementById('velo_dispo'),
  boutonReserver: document.getElementById('resa'),
  
  init: function(){
      velibMap.initMap();
  },
  //Initialisation de la map google
  initMap: function(){
  
    velibMap.map = new google.maps.Map(velibMap.map, {  

      center: {lat: 45.764043 , lng: 4.835659},
      zoom: 13
  
    }); 

    var markers = velibMap.initMarker();  
  },
  //recuperation des données de l'API
  initMarker: function(){
    var aMarkers = new Array();

    ajaxGet(velibMap.urlOpenData, function(reponse){
      //recuperation des données JSON
      var tmpResponse = JSON.parse(reponse);

      //Utilisation des données JSON pour chaque station
      tmpResponse.forEach(function(element){
        
        var myLatlng = new google.maps.LatLng(element.position.lat,element.position.lng);

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: velibMap.map,
        });

        //Evenement lors du clic sur le marqueur
        marker.addListener("click", function(){    
          velibMap.nameStation.textContent = element.name;
          velibMap.nameStation.style.color = "white";
          velibMap.nameStation.style.textAlign = "center";

          velibMap.statutStation.textContent = element.status;
          velibMap.statutStation.style.color = "white";
          velibMap.statutStation.style.textAlign = "center";

          velibMap.adresseStation.textContent = element.address;
          velibMap.adresseStation.style.color = "white";
          velibMap.adresseStation.style.textAlign = "center";

          velibMap.nbPlacesDispo.textContent = element.available_bike_stands;
          velibMap.nbPlacesDispo.style.color = "white";
          velibMap.nbPlacesDispo.style.textAlign = "center";

          velibMap.veloDispo.textContent = element.available_bikes;
          velibMap.veloDispo.style.color = "white";
          velibMap.veloDispo.style.textAlign = "center";

          if (element.available_bikes === 0 || element.status === 'CLOSE') {
            velibMap.boutonReserver.style.display = "none";
          }else{
            velibMap.boutonReserver.style.display = "block";
          }
        });

        aMarkers.push(marker);
        
      });

      /*Regroupement marqueur sur la carte pour plus de propreté*/
      var markerCluster = new MarkerClusterer(velibMap.map, aMarkers,{
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      
   }); 
  }
};
document.addEventListener('DOMContentLoaded', function(){
  velibMap.init();
}, false);

