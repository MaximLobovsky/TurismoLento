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
	    .setPopupContent(description + '<br><a href=' + link.toString() + '>Visita il sito</a>');

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

