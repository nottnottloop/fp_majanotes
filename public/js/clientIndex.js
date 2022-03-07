const protocol = window.location.protocol;
const host = window.location.host;

fetch(`${protocol}//${host}/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data))
	.catch(e => console.log(`Error: ${e}`));

const createButton = document.querySelector("#createButton");
const newMajanote = document.querySelector("#newMajanote");
const errorMessages = document.querySelector("#errorMessages");

if (errorMessages.textContent.length > 0) {
	newMajanote.style.display = "initial";
} else {
	newMajanote.style.display = "none";
}

createButton.addEventListener('click', () => {
	if (newMajanote.style.display === 'none') {
		newMajanote.style.display = "initial";
	} else {
		newMajanote.style.display = "none";
	}
});