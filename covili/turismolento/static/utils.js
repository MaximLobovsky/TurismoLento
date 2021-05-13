// JavaScript Document
function CreateMap(){
    let map = L.map("map").setView([41.902480, 12.496355], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    return map;
};

function PlaceMarker(map, N, E, description, link = ''){
	L.marker([N, E]).addTo(map)
        .bindPopup()
	    .setPopupContent(description + '<br><a href=' + link.toString() + ' target="_blank" rel="noopener noreferrer">Visita il sito</a>');

};

function setDefaultView(map){
    map.setView([41.902480, 12.496355],6);
}

function PlaceMarkers(map, places, descriptions, links){
    let place;
    let counter = 0;
    for (place of coordinates){
        if(place[0] != 0 && place[1] != 0) {
            PlaceMarker(my_map, place[0], place[1], descriptions[counter], links[counter]);
            counter += 1;
        }
    }
    setDefaultView(map);
}













// Javascript Lobovsky

function play_sound(soundobj) {
    let thissound = document.getElementById(soundobj);
    thissound.currentTime = 0;
    thissound.play();
  }
  
  
  
  function regione_filter() {
    lista = document.getElementById('selezione_regioni');
  }
  
  let checkbox_toggle = () => {
    // Get the checkbox
    let checkBox = document.getElementById("enable_regione_search");
    // Get the output text
    let coso = document.getElementById("elenco_regioni");
    let voci;
    voci = document.getElementsByClassName('single_list_item');
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
      coso.style.display = "block";
  
    } else {
      coso.style.display = "none";
      for (let voce of voci) 
      {
        voce.style.display = "";
      }
    }
  
  }
  
  
  
  function discriminazione_regione() {
    let voci;
    voci = document.getElementsByClassName('single_list_item');
    let regione_selezionata = document.getElementById("elenco_regioni").value;
    for (let voce of voci) //stessa cosa di Python, for element in array
    {
      if (regione_selezionata === voce.getAttribute('data-regione')) {
        voce.style.display = "";
      } else {
        voce.style.display = "none";
      }
    }
  }
  
  
  
  // Ricerca
  
  function ricerca(tab, lists) {
    let input;
    let filtro;
    let lista;
    let voci;
    let x;
    let i;
    let testo;
    input = document.getElementById(tab);
    filtro = input.value.toUpperCase();
    lista = document.getElementById('list_container');
    voci = lista.getElementsByClassName('single_list_item');
    for (i = 0; i < voci.length; i++) {
      x = voci[i];
      testo = x.textContent || x.innerText;
      if (testo.toUpperCase().indexOf(filtro) > -1) {
        voci[i].style.display = "";
      } else {
        voci[i].style.display = "none";
      }
    }
  }