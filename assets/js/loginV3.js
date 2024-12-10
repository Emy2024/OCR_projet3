//////////////////////* A REPRENDRE *///////////////////////
const form = document.querySelector("form")
const errorClassEmail = document.querySelectorAll(".messageErreurClientEmail")
const errorClassPassword = document.querySelectorAll(".messageErreurClientPassword")

const EMAIL = form.elements 
const PASSWORD = form.elements

function main(){
  initEvent()
}
main()

function initEvent(){
  form.addEventListener("submit", (event) => {
    login(event)
  })
}

function login(event){
  event.preventDefault()
  const errorMessageEmail = "Merci de renseigner une adresse email valide."
  const errorMessagePassword = "Merci de renseigner un mot de passe valide."
  
  isFormBlank(email, errorMessageEmail, errorClassEmail)
  isFormBlank(password, errorMessagePassword, errorClassPassword)
}


function isFormBlank(email, errorMessage, errorClass){
  if (email.value ===""){
    errorClass.innerText = errorMessage
    email.classList.add("placeholderError") 
    console.log("Attention, le champ n'est pas rempli")
  } else {  
    errorClass.innerText = ''
    field.classList.remove("placeholderError")
  } 
} 


function isEmailFormatValid(email){
  let emailRegExpression = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
  if(emailRegExpression.test(email.value)) {
    console.log("L'email est correct")
  }else{
    errorClassEmail.innerText= errorMessageEmail
    email.classList.add("placeholderError")
    console.log("L'email n'est pas correct")
  }
}







/* let emailTestSophieBluel = "sophie.bluel@test.tld"
let passwordTestSophieBluel = "S0phie"
 */
