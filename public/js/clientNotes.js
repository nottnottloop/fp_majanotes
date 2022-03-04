const protocol = window.location.protocol;
const host = window.location.host;

const notesGrid = document.querySelector("#notesGrid");

fetch(`${protocol}//${host}/notes/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data))
	.catch(e => console.log(`Error: ${e}`));

function renderNotes(data) {
	for (let i = 0; i < data.length; i++) {
		let newElement = document.createElement("section");
		newElement.classList.add("noteBody");
		newElement.insertAdjacentHTML("beforeend", `<h2 class="noteTitle">${data[i].title}</h2>`);
		newElement.insertAdjacentHTML("beforeend", `<p class="noteContent">${data[i].note}</p>`);
		newElement.style.backgroundColor = data[i].color;
		notesGrid.insertAdjacentElement("beforeend", newElement);
	}
}