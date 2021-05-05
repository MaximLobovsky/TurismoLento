// JavaScript Document
function CreateMap(){
    var map = L.map("map").setView([0,0], -1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    return map;
};

function PlaceMarker(map, N, E, description){
	L.marker([N, E]).addTo(map)
    .bindPopup(description)
    .openPopup();
};

function setView(map, latitude, longitude, zoom){
    map.setView([latitude, longitude], zoom);
}