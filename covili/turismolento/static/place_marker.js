// JavaScript Document
function CreateMap(){
    let map = L.map("map").setView([41.902480, 12.496355], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    return map;
};

function PlaceMarker(map, N, E, description){
	L.marker([N, E]).addTo(map)
    .bindPopup(description);
};

function setDefaultView(map){
    map.setView([41.902480, 12.496355],6);
}