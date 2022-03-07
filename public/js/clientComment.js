const protocol = window.location.protocol;
const host = window.location.host;

fetch(`${protocol}//${host}/comment/0`)
	.then(resp => resp.json())
	.then(data => renderCommentNote(data))
	.catch(e => console.log(`Error: ${e}`));

function renderCommentNote(data) {
	const notesGrid = document.querySelector("#notesGrid");
	notesGrid.insertAdjacentElement("beforeend", buildNoteElement(data));
	notesGrid.style.opacity = 1;
}