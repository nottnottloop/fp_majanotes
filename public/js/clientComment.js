const protocol = window.location.protocol;
const host = window.location.host;
const pathname = window.location.pathname;
const id = parseInt(pathname.substring(pathname.lastIndexOf("/") + 1));

fetch(`${protocol}//${host}/data/${id}`)
	.then(resp => resp.json())
	.then(data => renderCommentNote(data))
	.catch(e => console.log(`Error: ${e}`));

function renderCommentNote(data) {
	const notesGrid = document.querySelector("#notesGrid");
	notesGrid.insertAdjacentElement("beforeend", buildNoteElement(data));
	const heart = document.querySelector(`#heart${id}`);
	const thumbs = document.querySelector(`#thumbs${id}`);
	const neutral = document.querySelector(`#neutral${id}`);

	addEmojiFunctionality(heart, "heart", id);
	addEmojiFunctionality(thumbs, "thumbs", id);
	addEmojiFunctionality(neutral, "neutral", id);
	notesGrid.style.opacity = 1;
}