const apiKey = `B9l8mpk3zgHi1IkTjbd0IK5PcGqAVGAp`;
let selectedGif = '';

const giphyGifs = document.querySelector('#giphyGifs');
const selectGifText = document.querySelector('#selectGifText');
const giphyRemove = document.querySelector('#giphyRemove');

document.querySelector("#giphyButton").addEventListener('click', e => {
	e.preventDefault();
	let url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=32&q=`
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
		for (let i = 0; i < content.data.length; i++) {
			//figure for body of image
			let fig = document.createElement(`figure`);
			fig.id = `figure${i}`
			fig.classList.add(`gifFigure`);
			let img = document.createElement('img');
			//fig caption for a caption of an image
			//let fc = document.createElement('figcaption');
			img.src = content.data[i].images.downsized.url;
			img.alt = content.data[i].title;
			//fc.textContent = content.data[i].title;
			fig.appendChild(img);
			//fig.appendChild(fc);
			//this actually makes the image render on the page
			giphyGifs.insertAdjacentElement("beforeend", fig);

			fig.addEventListener("click", () => {
				selectedGif = img.src;
				console.log(selectedGif);

				for (const e of giphyGifs.children) {
					e.classList.remove("selectedGif");
				}
				fig.classList.add("selectedGif");
			});
		}

		selectGifText.style.display = "block";
		giphyRemove.style.display = "initial";
		//this was all successful, so we save the selected gif for later
		selectedGif = content.data[0].images.downsized.url;
	})
	.catch(err => {
		console.error(err);
	})
});

giphyRemove.addEventListener('click', e => {
	e.preventDefault();
	selectedGif = '';
	selectGifText.style.display = "none";
	giphyRemove.style.display = "none";
	giphyGifs.innerHTML = '';
});

document.querySelector("#submitButton").addEventListener('click', e => {
	//since we are sending a POST request via HTML, we need to manipulate a hidden form field to fill in the URL of the
	//gif that has been selected.

	//this can also be done with an XMLHttpRequest as was once done below
	//however, this means that the client will not respond to the servers redirects correctly
	//therefore this seems like the better solution
	document.querySelector("#giphyUrl").value = selectedGif;
	document.querySelector("#usernameField").value = localStorage.getItem('username');
});

const noteBox = document.querySelector("#noteBox");
noteBox.addEventListener('keyup', updateTextBoxCounter);
noteBox.addEventListener('keydown', updateTextBoxCounter);

//document.querySelector("#addNewNote").addEventListener('submit', e => {
//	e.preventDefault();
//    let title = document.querySelector("#titleBox").value;
//    let note = document.querySelector("#noteBox").value;
//    let color = document.querySelector("#colorDropdown").value;
//	let gif=document.querySelector("#giphyUrl").value;
//	console.log(title,note,color,gif)
//	let xhr = new XMLHttpRequest();
//	xhr.open("POST", `${protocol}//${host}/new`);
//	xhr.setRequestHeader('Content-Type', 'application/json');
//	xhr.send(JSON.stringify({
//		title: title,
//		note: note,
//		color: color,
//		gif: selectedGif
//	}));
//	window.location.href = `${protocol}//${host}/notes`
//})
