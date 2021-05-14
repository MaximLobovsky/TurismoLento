// JavaScript Document


//create the map in the div with id "map"
function CreateMap(){
    var map = L.map("map").setView([41.902480, 12.496355], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    layers = L.layerGroup();
    return map;
};

//place a single marker
function PlaceMarker(map = 0, N, E, description, link = ''){
	L.marker([N, E]).addTo(layers)
      .bindPopup()
	    .setPopupContent(description + '<br><a href=' + link.toString() + ' target="_blank" rel="noopener noreferrer">Visita il sito</a>');

};

//reset map view
function setDefaultView(map){
    map.setView([41.902480, 12.496355],6);
};

//place markers with information in the lists
function PlaceMarkers(map, coordinates, descriptions, links){
    let place;
    let counter = 0;
    for (place of coordinates){
        if(place[0] != 0 && place[1] != 0) {
            PlaceMarker(my_map, place[0], place[1], descriptions[counter], links[counter]);
            counter += 1;
        }
    }
    setDefaultView(map);
    map.addLayer(layers);
}

function ClearMap(){
  layers.clearLayers();
}

// reset map id div
function NewMap(places_index, coordinates, descriptions, links){
  ClearMap();
  let i = 0;
  let j = 0;
  for(i = 0; i<descriptions.length; i++){
    for(j = 0; j< places_index.length; j++){
      if(i == places_index[j]){
        PlaceMarker(map, coordinates[i][0], coordinates[i][1], descriptions[i], links[i]);
      }
    }
  }
  map.addLayer(layers);
}

// Javascript Lobovsky
/*
function play_sound(soundobj) {
    let thissound = document.getElementById(soundobj);
    thissound.currentTime = 0;
    thissound.play();
  }
  */


  function regione_filter() {
    lista = document.getElementById('selezione_regioni');
  }

  let checkbox_toggle = (coordinates, descriptions, links) => {
    // Get the checkbox
    let checkBox = document.getElementById("enable_regione_search");
    // Get the output text
    let coso = document.getElementById("elenco_regioni");
    let voci;
    let index_founds = [];
    let i;
    voci = document.getElementsByClassName('single_list_item');

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
      coso.style.display = "block";
      discriminazione_regione(coordinates, descriptions, links);
    } else {
      coso.style.display = "none";
      // for (let voce of voci)
      // {
      for(i = 0; i< voci.length; i++) {
        voci[i].style.display = "";
        index_founds.push(i);
      }
      // }
    }
    NewMap(index_founds, coordinates, descriptions, links);
  }



  function discriminazione_regione(coordinates, descriptions, links) {
    let voci;
    let i;
    let index_founds = [];
    voci = document.getElementsByClassName('single_list_item');
    let regione_selezionata = document.getElementById("elenco_regioni").value;
    // for (let voce of voci) //stessa cosa di Python, for element in array
    // {
    for (i = 0; i< voci.length; i++){
      if (regione_selezionata === voci[i].getAttribute('data-regione')) {
        voci[i].style.display = "";
        index_founds.push(i);
      } else {
        voci[i].style.display = "none";
      }
    }
    NewMap(index_founds, coordinates, descriptions, links);
  }



  // Ricerca

  function ricerca(tab, lists, coordinates, descriptions, links) {
    let input;
    let filtro;
    let lista;
    let voci;
    let x;
    let i;
    let testo;
    let index_founds = [];
    input = document.getElementById(tab);
    filtro = input.value.toUpperCase();
    lista = document.getElementById('list_container');
    voci = lista.getElementsByClassName('single_list_item');
    for (i = 0; i < voci.length; i++) {
      x = voci[i];
      testo = x.textContent || x.innerText;
      if (testo.toUpperCase().indexOf(filtro) > -1) {
        voci[i].style.display = "";
        index_founds.push(i);
      } else {
        voci[i].style.display = "none";
      }
    }
    NewMap(index_founds, coordinates, descriptions, links);
  }

