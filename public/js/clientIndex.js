const protocol = window.location.protocol;
const host = window.location.host;
const createButton = document.querySelector("#createButton");
const newMajanote = document.querySelector("#newMajanote");
const errorMessages = document.querySelector("#errorMessages");

let errors;
errorMessages.textContent.length > 0 ? errors = true : errors = false;

fetch(`${protocol}//${host}/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data))
   
if (errors) {
    newMajanote.style.display = "initial";
} else {
    newMajanote.style.display = "none";
}
    
document.getElementById('logoutButton').addEventListener('click', ()=>{
    window.localStorage.clear()
    user=window.localStorage.clear();
    window.location.href="/"
})

createButton.addEventListener('click', () => {
    if (newMajanote.style.display === 'none') {
            newMajanote.style.display = "initial";
    } else {
            newMajanote.style.display = "none";
    }
});

const loggedInText = document.querySelector("#loggedInText");
let username = localStorage.getItem("User");
if (username) {
    loggedInText.display = "initial";
    loggedInText.textContent = `Logged in as ${username}`;
}
