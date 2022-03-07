const protocol = window.location.protocol;
const host = window.location.host;

fetch(`${protocol}//${host}/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data))
	.catch(e => console.log(`Error: ${e}`));

const newMajanote = document.querySelector("#newMajanote");
newMajanote.style.display = "none";
const createButton = document.querySelector("#createButton");

createButton.addEventListener('click', () => {
	if (newMajanote.style.display === 'none') {
		newMajanote.style.display = "initial";
	} else {
		newMajanote.style.display = "none";
	}
});