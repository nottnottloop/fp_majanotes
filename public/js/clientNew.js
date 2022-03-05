const apiKey = `B9l8mpk3zgHi1IkTjbd0IK5PcGqAVGAp`;
let selectedGif = '';

document.querySelector("#giphyButton").addEventListener('click', e => {
	e.preventDefault();
	let url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`
	let str = document.querySelector("#giphySearch").value.trim();
	url = url.concat(str);
	console.log(url);
	fetch(url)
	.then(resp => resp.json())
	.then(content => {
		//data, pagination, meta
		console.log(content.data)
		console.log('Meta', content.meta)
		let fig = document.createElement('figure');
		let img = document.createElement('img');
		let fc = document.createElement('figcaption');
		img.src = content.data[0].images.downsized.url;
		img.alt = content.data[0].title;
		fc.textContent = content.data[0].title;
		fig.appendChild(img);
		fig.appendChild(fc);
		//let out = document.querySelector('#giphyGifs');
		//out.insertAdjacentElement('afterbegin', fig);
		document.querySelector('#giphyGifs').innerHTML = fig.innerHTML;

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