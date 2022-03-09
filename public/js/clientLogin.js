const protocol = window.location.protocol;
const host = window.location.host;
const createButton = document.querySelector("#createButton");
const newMajanote = document.querySelector("#newMajanote");
const errorMessages = document.querySelector("#errorMessages");

let user= window.localStorage?window.localStorage.getItem("User"):null;


let errors;
errorMessages.textContent.length > 0 ? errors = true : errors = false;

const redirectLogin =()=>{
    window.location.href=`${protocol}//${host}/login`
    return
}

user?fetch(`${protocol}//${host}/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data))
	.catch(e => console.log(`Error: ${e}`)):
    redirectLogin();
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
    

