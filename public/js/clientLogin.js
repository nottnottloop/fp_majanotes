const protocol = window.location.protocol;
const host = window.location.host;


let user= window.localStorage.getItem("User")

user?fetch(`${protocol}//${host}/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data))
	.catch(e => console.log(`Error: ${e}`)):
	fetch(`${protocol}//${host}/loggedout`)



