const say = function (name) {
	let newDiv = document.createElement('div');
	newDiv.setAttribute('style','background-color:black;color:white;padding:20px;' )
	newDiv.innerHTML = `Hello, ${name}`;
	document.body.appendChild(newDiv); 
}

export default say;