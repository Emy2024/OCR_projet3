import * as UserFetch from "./modules/fetch/userFetch.js"

const FORM = document.getElementById("formLogin")

// Point d'entrée de la page
function main(){
  initEvents()
}
main()

// Initialisation de l'évènement submit du formulaire 
function initEvents(){
  FORM.addEventListener("submit", function (event) {
    event.preventDefault()
    login()
  });
}

// Affiche l'erreur
function displayError(){
  let error_id = document.getElementById("messageErreurFetch")
      error_id.innerHTML="Couple identifiant / mot de passe invalide."
      error_id.style.display ="flex"

  let mail_id_input = document.getElementById("email") 
      mail_id_input.classList.add("placeholderError")

  let mail_icon_class_error = document.getElementById("inputIconMail") 
      mail_icon_class_error.style.display ="flex"

  let password_id_input = document.getElementById("password") 
      password_id_input.classList.add("placeholderError")
  
  let password_icon_class_error = document.getElementById("inputIconPassword")
      password_icon_class_error.style.display ="flex"
}

// Cache l'erreur
function hideError(){
  let error_id = document.getElementById("messageErreurFetch")
      error_id.style.display ="none"

  let mail_id_input = document.getElementById("email") 
      mail_id_input.classList.remove("placeholderError")

  let mail_icon_class_error = document.getElementById("inputIconMail") 
      mail_icon_class_error.style.display ="none"

  let password_id_input = document.getElementById("password") 
      password_id_input.classList.remove("placeholderError")
  
  let password_icon_class_error = document.getElementById("inputIconPassword")
      password_icon_class_error.style.display ="none"
}


// Vérifie le format du mail
function checkMailFormat(emailValue) {
  let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regexEmail.test(emailValue)) {
   displayError()
  } else {
    hideError()
  }
} 

// Envoi de la charge utile et implémentation du local storage qui stoke le token
async function login() {
  let email = document.getElementById("email").value
      checkMailFormat(email)
  let password = document.getElementById("password").value

  let data = await UserFetch.login(email, password)

  if(email.includes(" ") || password.includes(" ") || !data){
    console.log("Retour en erreur de login")
    displayError()
    return
  }

  hideError()
  localStorage.setItem("token", data.token)
  window.open("index.html","_self")
}

