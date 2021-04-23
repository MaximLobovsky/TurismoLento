// JavaScript Document
function CreateMap(){
	let map = L.map('map')
	let latitude = 42.21429593400444;
	let longitude = 14.139413546684736;
	let description = "Title example";

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	PlaceMarker(map, latitude, longitude, description);
	map.setView([latitude, longitude], 10);

	return map;
};


function PlaceMarker(map, N, E, description){
	L.marker([N, E]).addTo(map)
    .bindPopup(description)
    .openPopup();
};

function stop(e) {
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
}