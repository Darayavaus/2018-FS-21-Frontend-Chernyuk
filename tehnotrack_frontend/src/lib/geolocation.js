function getPosition(options) {
	return new Promise((resolve, rej) => {
		window.navigator.geolocation.getCurrentPosition(resolve, rej, options);
	});
}

export default getPosition; 