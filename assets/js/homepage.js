let BTN_MODIFIER = document.createElement("a")
BTN_MODIFIER.id = "a_modifier"

let MODAL_TITLE = document.createElement("p")
let MODAL_MAIN_CONTENT = document.createElement("div")
let MODAL_BTN = document.createElement("button")

const MODALE_1_MAIN_CONTENT = document.createElement("div")
MODALE_1_MAIN_CONTENT.innerHTML="yyyyyyyyyyyyyyyyyyyyy"

const MODALE_2_ET_3_MAIN_CONTENT = document.createElement("div")
MODALE_2_ET_3_MAIN_CONTENT.innerHTML="xxxxxxxxxxxxxxxxx"

function main(){
  if (sessionStorage.getItem("token")) {
    createElementModeEdition()
    createElementModifier() 
    // modaleFirstStep(title, content, button) :
    modaleTemplate("Galerie photo", MODALE_1_MAIN_CONTENT, "Ajouter une photo")
    modaleTemplate("Ajout photo", MODALE_2_ET_3_MAIN_CONTENT, "Valider")
  }
 else (console.log("error"))
}
main()

function createElementModeEdition(){
  let id_modeEdition = document.querySelector("#divModeEdition")

  let sous_div_modeEdition = document.createElement("div") 
  let icon_modeEdition = document.createElement("i")
  
  icon_modeEdition.classList.add("fa-regular", "fa-pen-to-square")
  sous_div_modeEdition.classList.add("sous_div_modeEdition")

  id_modeEdition.appendChild(sous_div_modeEdition)
  sous_div_modeEdition.appendChild(icon_modeEdition)
}

function createElementModifier(){
  let id_mesProjets = document.getElementById("mesProjets")

  BTN_MODIFIER.href='index.html'
  let i_modifier_icone = document.createElement("i")
 
  i_modifier_icone.classList.add("fa-regular", "fa-pen-to-square")
  BTN_MODIFIER.classList.add("btn_modifier")

  id_mesProjets.appendChild(BTN_MODIFIER)
  BTN_MODIFIER.appendChild(i_modifier_icone)
}


/* document.getElementById("a_modifier").addEventListener("click", function(event){
  event.stopPropagation()
  
})
 */



function modaleTemplate(title, content, button){
  let modal_location = document.getElementById("modal")
  let modal_backgroundOverlay = document.createElement("div")
  modal_backgroundOverlay.classList.add("modal_backgroundOverlay")
  let modal_WhiteBackground = document.createElement("div")
  modal_WhiteBackground.classList.add("modal_WhiteBackground")
  let modal_SubContainer = document.createElement("div")
  modal_SubContainer.classList.add("modal_SubContainer")
  let modal_CloseModal = document.createElement("p")
  modal_CloseModal.innerHTML = "x"
  modal_CloseModal.href = "#"
  modal_CloseModal.classList.add("modal_CloseModal")

  MODAL_TITLE.innerHTML = title
  MODAL_TITLE.classList.add("modal_title") //mon titre qui change

  MODAL_MAIN_CONTENT = content
  MODAL_MAIN_CONTENT.classList.add("modal_Content") //mon content qui change

  let modal_Line = document.createElement("div")
  modal_Line.classList.add("modal_Line")

  MODAL_BTN.classList.add("modal_btn")
  MODAL_BTN.innerHTML= button //mon boutton qui change

  modal_location.appendChild(modal_backgroundOverlay)
  modal_backgroundOverlay.appendChild(modal_WhiteBackground)
  modal_WhiteBackground.appendChild(modal_CloseModal)
  modal_WhiteBackground.appendChild(modal_SubContainer)
  modal_SubContainer.appendChild(MODAL_TITLE)
  modal_SubContainer.appendChild(MODAL_MAIN_CONTENT)
  modal_SubContainer.appendChild(modal_Line)
  modal_SubContainer.appendChild(MODAL_BTN)
}





/* function displayGallery(){

}
 */






