const protocol = window.location.protocol;
const host = window.location.host;
const pathname = window.location.pathname;
const id = pathname.substring(pathname.lastIndexOf("/") + 1);

fetch(`${protocol}//${host}/data/${id}`)
	.then(resp => resp.json())
	.then(data => renderCommentNote(data))
	.catch(e => console.log(`Error: ${e}`));

function renderCommentNote(data) {
	const notesGrid = document.querySelector("#notesGrid");
	notesGrid.insertAdjacentElement("beforeend", buildNoteElement(data));
	notesGrid.style.opacity = 1;
}