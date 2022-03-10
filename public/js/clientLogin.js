const protocol = window.location.protocol;
const host = window.location.host;

//const errorMessages = document.querySelector("#errorMessages");

//let errors;
//errorMessages.textContent.length > 0 ? errors = true : errors = false;

//document.getElementById('logoutButton').addEventListener('click', ()=>{
//    window.localStorage.clear()
//    console.log(user)
//    user=window.localStorage.clear();
//    dataFetch();
//})
console.log(protocol,host)
const loginSubmitButton = document.querySelector("#loginSubmitButton");
const loginUser = document.querySelector("#loginUser");
const loginPass = document.querySelector("#loginPass");
loginSubmitButton.addEventListener("click", () => {
    fetch(`${protocol}//${host}/login`, {
        "method": 'POST',
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify({username: loginUser.value, password: loginPass.value})})
    .then(resp => {
        console.log(`Our res code is ${resp.status}`)
        if (resp.status == 200) { 
            localStorage.setItem('username', loginUser.value);
            localStorage.setItem('password', loginPass.value);
        }
        
    })
});
