const apiKey = `B9l8mpk3zgHi1IkTjbd0IK5PcGqAVGAp`;
let selectedGif = '';
const protocol = window.location.protocol;
const host = window.location.host;

document.querySelector("#giphyButton").addEventListener('click', e => {
	e.preventDefault();
	let url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`
	//trim method removes extra whitespace at the ends of the query
	let str = document.querySelector("#giphySearch").value.trim();
	//concat to add the contents of str onto url
	url = url.concat(str);
	console.log(url);
	fetch(url)
	.then(resp => resp.json())
	.then(content => {
		//data, pagination, meta
		console.log(content.data)
		console.log('Meta', content.meta)
		//figure for body of image
		let fig = document.createElement('figure');
		let img = document.createElement('img');
		//fig caption for a caption of an image
		let fc = document.createElement('figcaption');
		img.src = content.data[0].images.downsized.url;
		img.alt = content.data[0].title;
		fc.textContent = content.data[0].title;
		fig.appendChild(img);
		fig.appendChild(fc);
		//this actually makes the image render on the page
		document.querySelector('#giphyGifs').innerHTML = fig.innerHTML;

		//this was all successful, so we save the selected gif for later
		selectedGif = content.data[0].images.downsized.url;
	})
	.catch(err => {
		console.error(err);
	})
});

document.querySelector("#giphyRemove").addEventListener('click', e => {
	e.preventDefault();
	selectedGif = '';
	document.querySelector('#giphyGifs').innerHTML = '';
});

document.querySelector("#submitButton").addEventListener('click', e => {
	//since we are sending a POST request via HTML, we need to manipulate a hidden form field to fill in the URL of the
	//gif that has been selected.

	//this can also be done with an XMLHttpRequest as was once done below
	//however, this means that the client will not respond to the servers redirects correctly
	//therefore this seems like the better solution
	document.querySelector("#giphyUrl").value = selectedGif;
});


//document.querySelector("#submitButton").addEventListener('click', e => {
//	e.preventDefault();
//	let title = document.querySelector("#titleBox").value;
//	let note = document.querySelector("#noteBox").value;
//	let color = document.querySelector("#colorDropdown").value;

//	let xhr = new XMLHttpRequest();
//	xhr.open("POST", `${protocol}//${host}/notes/new`);
//	xhr.setRequestHeader('Content-Type', 'application/json');
//	xhr.send(JSON.stringify({
//		title: title,
//		note: note,
//		color: color,
//		gif: selectedGif
//	}));
//	window.location.href = `${protocol}//${host}/notes`
//});