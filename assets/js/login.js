const FORM = document.getElementById("formLogin")
const SUBMIT = document.getElementById("submit")


//////////////////////* FETCH *///////////////////////
const URL_DATA_API_USERS = "http://localhost:5678/api/users/login"
const ERROR_MESSAGE_FETCH = "Identifiants invalides."
const FETCH_ID_ERROR = document.getElementById("messageErreurFetch")

//////////////////////* EMAIL *///////////////////////
const MAIL_ID_INPUT = document.getElementById("email")
const MAIL_ICON_CLASS_ERROR = document.querySelector(".inputIconMail")
const MAIL_ID_ERROR = document.getElementById("messageErreurClientEmail")
const MAIL_ERROR_MESSAGE = "Merci de renseigner un email valide."
const MAIL_ERROR_MESSAGE_FORMAT = "Merci de renseigner un format d'email correct."

//////////////////////* PASSWORD *///////////////////////
const PASSWORD_ID_INPUT = document.getElementById("password") 
const PASSWORD_ICON_CLASS_ERROR = document.querySelector(".inputIconPassword")
const PASSWORD_ID_ERROR = document.getElementById("messageErreurClientPassword")
const PASSWORD_ERROR_MESSAGE = "Merci de renseigner un mot de passe valide."
const PASSWORD_ERROR_MESSAGE_TOO_SHORT = "Le mot de passe doit contenir 6 caractères minimum."


// Mon point d'entrée
function main(){
  isFormSent()
}
main()



// Quand je clique, il se passe ...
function isFormSent(){
FORM.addEventListener("submit", function (event) {
  event.preventDefault(); 
  handleInput()
  postData()
});
}


// Fonction pour chaque input du formulaire :
function handleInput(){
  let emailValue = MAIL_ID_INPUT.value.trim()
  let passwordValue = PASSWORD_ID_INPUT.value.trim()
  //console.log(emailValue)

  if (emailValue === ""){
    errorInput(MAIL_ICON_CLASS_ERROR, MAIL_ID_INPUT, MAIL_ID_ERROR, MAIL_ERROR_MESSAGE)
  } else if (!isMailFormatValid(emailValue)){
    errorInput(MAIL_ICON_CLASS_ERROR, MAIL_ID_INPUT, MAIL_ID_ERROR,MAIL_ERROR_MESSAGE_FORMAT)
  } else {
    successInput(MAIL_ICON_CLASS_ERROR, MAIL_ID_INPUT, MAIL_ID_ERROR)
  }

  if (passwordValue === ""){
    errorInput(PASSWORD_ICON_CLASS_ERROR, PASSWORD_ID_INPUT, PASSWORD_ID_ERROR, PASSWORD_ERROR_MESSAGE)
  } else if (passwordValue.length <6) {
    errorInput(PASSWORD_ICON_CLASS_ERROR, PASSWORD_ID_INPUT, PASSWORD_ID_ERROR, PASSWORD_ERROR_MESSAGE_TOO_SHORT)
  } else {
    successInput(PASSWORD_ICON_CLASS_ERROR, PASSWORD_ID_INPUT, PASSWORD_ID_ERROR)
  }
}



// Si j'ai une erreur :
function errorInput(icon, placeholder, idError, error){
  icon.classList.remove("hideIcon")
  placeholder.classList.add("placeholderError")
  idError.innerHTML = error
  idError.classList.add("messageErreur") 
}


// Si je n'ai pas d'erreurs :
function successInput(icon, placeholder, idError){
  icon.classList.add("hideIcon")
  placeholder.classList.remove("placeholderError")
  idError.innerHTML = ""
  idError.classList.remove("messageErreur") 
}


// Si j'ai une erreur - fetch uniquement:
function errorInputFetch(idError, error){
  idError.innerHTML = error
  idError.classList.add("messageErreurFetch") 
}


// Mon expression régulière
function isMailFormatValid(emailValue) {
  const regularExpressionPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regularExpressionPattern.test(emailValue)
} 


async function postData() {

  let retrieveDataFromForm = 
  {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }
    // Ma charge utile que je convertis en JSON :
  const payload = JSON.stringify(retrieveDataFromForm)

  fetch(URL_DATA_API_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
    },
    body: payload, 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP :  ${response.status}`)
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    sessionStorage.setItem("token", data.token)
    window.open("index.html")
  })
  .catch(error => {
    console.error("Erreur", error)
    errorInputFetch(FETCH_ID_ERROR, ERROR_MESSAGE_FETCH)
  })   
}




