import {MessageForm, LogInForm} from './lib/chit-chat.js';
import DropZone from './lib/dropzone.js';

import getPosition from './lib/geolocation.js';


var gps_info = document.querySelector(".gps-info");
var gps_button = document.querySelector(".gps-button");

gps_button.addEventListener("submit", function (event) {
	event.stopPropagation();
	event.preventDefault();
  var promise = getPosition();
	promise.then(showPosition, null);
})

function showPosition(position) {
  gps_info.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}


