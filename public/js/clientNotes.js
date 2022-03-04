const protocol = window.location.protocol;
const host = window.location.host;

const notesGrid = document.querySelector("#notesGrid");

let notesCount = 0;

fetch(`${protocol}//${host}/notes/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data))
	.catch(e => console.log(`Error: ${e}`));

function renderNotes(data) {
	notesCount = data.length;
	for (let i = 0; i < data.length; i++) {
		let newElement = document.createElement("section");
		newElement.classList.add("noteBody");
		newElement.insertAdjacentHTML("beforeend", `<h2 class="noteTitle">${data[i].title}</h2>`);
		newElement.insertAdjacentHTML("beforeend", `<p class="noteContent">${data[i].note}</p>`);
		newElement.insertAdjacentHTML("beforeend", `<button id="heart${i}" class="emojiButton">❤️</p>`);
		newElement.insertAdjacentHTML("beforeend", `<button id="thumbs${i}" class="emojiButton">👎</p>`);
		newElement.insertAdjacentHTML("beforeend", `<button id="neutral${i}" class="emojiButton">😐</p>`);
		newElement.style.backgroundColor = data[i].color;
		notesGrid.insertAdjacentElement("beforeend", newElement);
	}
	//now change the opacity so the notes fade in :)
	notesGrid.style.opacity = "1";

	for (let i = 0; i < notesCount; i++) {
		const heart = document.querySelector(`#heart${i}`);
		const thumbs = document.querySelector(`#thumbs${i}`);
		const neutral = document.querySelector(`#neutral${i}`);

		addEmojiFunctionality(heart, "heart", i);
		addEmojiFunctionality(thumbs, "thumbs", i);
		addEmojiFunctionality(neutral, "neutral", i);
	}
}

function addEmojiFunctionality(element, emoji, index) {
	element.addEventListener('click', () => {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", `${protocol}//${host}/notes/emoji`);
		xhr.setRequestHeader('Content-Type', 'application/json');
		let str = JSON.stringify({emoji:emoji, index:index})
		console.log(str)
		xhr.send(JSON.stringify({
			emoji: emoji,
			index: index
		}));
	});
}