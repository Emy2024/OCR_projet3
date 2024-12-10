document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault()
 
  let emailInput = document.getElementById("email");

  if (emailInput.value === ""){
    console.log("Attention, le champ n'est pas rempli")
  } else {  
    console.log("Le champ est rempli")
  }


})









 

  

 
