//////////////////////* A REPRENDRE *///////////////////////
const FORM = document.getElementById("formLogin")
const SUBMIT = document.getElementById("submit")

const URL_DATA_API_USERS = "http://localhost:5678/api/users/login"

const INPUT_VALUE = document.querySelectorAll("input") // tous mes inputs
const MAIL_ID_INPUT = document.getElementById("email")
const MAIL_VALUE = document.getElementById("email").value 
const MAIL_ICON_CLASS_ERROR = document.querySelector(".inputIconMail")
const MAIL_ID_ERROR = document.getElementById("messageErreurClientEmail")
const MAIL_ERROR_MESSAGE = "Merci de renseigner un email valide."
const MAIL_ERROR_MESSAGE_FORMAT = "Merci de renseigner un format d'email correct."

const PASSWORD_ID_INPUT = document.getElementById("password") 
const PASSWORD_VALUE = document.getElementById("password").value
const PASSWORD_ICON_CLASS_ERROR = document.querySelector(".inputIconPassword")
const PASSWORD_ID_ERROR = document.getElementById("messageErreurClientPassword")
const PASSWORD_ERROR_MESSAGE = "Merci de renseigner un mot de passe valide."
const PASSWORD_ERROR_MESSAGE_TOO_SHORT = "Le mot de passe doit contenir 6 caractères minimum."


// Mon point d'entrée
/* function main(){
 
 

}
main()
 */


// Quand je clique, il se passe ...
FORM.addEventListener("submit", function (event) {
  event.preventDefault(); 
  handleInput()
  checkData()
});





function handleInput(){
  let emailValue = MAIL_ID_INPUT.value.trim();
  let passwordValue = PASSWORD_ID_INPUT.value.trim();
  //console.log(emailValue)

  if (emailValue === ""){
    errorInput(MAIL_ICON_CLASS_ERROR, MAIL_ID_INPUT, MAIL_ID_ERROR, MAIL_ERROR_MESSAGE);
  } else if (!isMailFormatValid(emailValue)){
    errorInput(MAIL_ICON_CLASS_ERROR, MAIL_ID_INPUT, MAIL_ID_ERROR,MAIL_ERROR_MESSAGE_FORMAT);
  } else {
    successInput(MAIL_ICON_CLASS_ERROR, MAIL_ID_INPUT, MAIL_ID_ERROR);
  }

  if (passwordValue === ""){
    errorInput(PASSWORD_ICON_CLASS_ERROR, PASSWORD_ID_INPUT, PASSWORD_ID_ERROR, PASSWORD_ERROR_MESSAGE);
  } else if (passwordValue.length <6) {
    errorInput(PASSWORD_ICON_CLASS_ERROR, PASSWORD_ID_INPUT, PASSWORD_ID_ERROR, PASSWORD_ERROR_MESSAGE_TOO_SHORT);
  } else {
    successInput(PASSWORD_ICON_CLASS_ERROR, PASSWORD_ID_INPUT, PASSWORD_ID_ERROR);
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

// Mon expression régulière
function isMailFormatValid(emailValue) {
  const regularExpressionPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regularExpressionPattern.test(emailValue);
} 





async function checkData() {
 
  let retrieveDataFromForm = 
  {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }

  const chargeUtile = JSON.stringify(retrieveDataFromForm)
  console.log(chargeUtile)

  fetch(URL_DATA_API_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: chargeUtile, 
  })
    .then((response) => {
      if (!response.ok) {
        errorInput(MAIL_ICON_CLASS_ERROR, MAIL_ID_INPUT, MAIL_ID_ERROR, MAIL_ERROR_MESSAGE);
        errorInput(PASSWORD_ICON_CLASS_ERROR, PASSWORD_ID_INPUT, PASSWORD_ID_ERROR, PASSWORD_ERROR_MESSAGE);
      } 
      else {response.json()
        window.open("index.html");
      }
    })

      

/*     .catch((error) => {
      MAIL_ICON_CLASS_ERROR.classList.remove("hideIcon")
      MAIL_ID_INPUT.classList.add("placeholderError")
      MAIL_ID_ERROR.innerHTML = MAIL_ERROR_MESSAGE_FETCH
      MAIL_ID_ERROR.classList.add("messageErreur") 
      PASSWORD_ID_INPUT.classList.add("placeholderError")
      PASSWORD_ID_ERROR.innerHTML = PASSWORD_ERROR_MESSAGE_FETCH
      PASSWORD_ID_ERROR.classList.add("messageErreur") 
    }); */
    // cookie http only ?
    // ouvrir une nouvelle page pour rediriger l'utilisateur vers index.html
} 
