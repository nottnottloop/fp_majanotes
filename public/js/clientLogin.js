const protocol = window.location.protocol;
const host = window.location.host;

const createButton = document.querySelector("#createButton");
const newMajanote = document.querySelector("#newMajanote");
const errorMessages = document.querySelector("#errorMessages");
//const email=window.localStorage.getItem("User")
//console.log(email)

let errors;
errorMessages.textContent.length > 0 ? errors = true : errors = false;

let user= window.localStorage.getItem("User")

user?fetch(`${protocol}//${host}/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data))
	.catch(e => console.log(`Error: ${e}`)):
	fetch(`${protocol}//${host}/loggedout`)

if (errors) {
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
