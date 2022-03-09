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

document.getElementById('logoutButton').addEventListener('click', ()=>{
    window.localStorage.clear()
    console.log(user)
    user=window.localStorage.clear();
    dataFetch();
})

function dataFetch(){
user?fetch(`${protocol}//${host}/data`)
	.then(resp => resp.json())
	.then(data => renderNotes(data)):
    redirectLogin();

}	

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

dataFetch();
    

