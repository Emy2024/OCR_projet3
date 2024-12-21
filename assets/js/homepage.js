let BTN_MODIFIER = document.createElement("a")
BTN_MODIFIER.id = "a_modifier"

let MODAL_SUBCONTAINER = document.createElement("div")
let MODAL_LOCATION = document.getElementById("modal")
let MODAL_BACKGROUND_OVERLAY = document.createElement("div")
let MODAL_WHITE_BACKGROUND = document.createElement("div")
let MODAL_LINE = document.createElement("div")

let MODAL_TITLE = document.createElement("p")
let MODAL_MAIN_CONTENT = document.createElement("div")
let MODAL_BTN = document.createElement("button")

let MODAL_CLOSEMODAL = document.createElement("p")

/* const MODALE_2_ET_3_MAIN_CONTENT = document.createElement("div")
MODALE_2_ET_3_MAIN_CONTENT.innerHTML="xxxxxxxxxxxxxxxxx" */

function main(){
  if (sessionStorage.getItem("token")) {
    createElementModeEdition()
    createElementModifier() 
    initModale()
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

function modaleTemplate(title, content, button){
  MODAL_BACKGROUND_OVERLAY.classList.add("modal_backgroundOverlay")
  MODAL_WHITE_BACKGROUND.classList.add("modal_WhiteBackground")
  MODAL_SUBCONTAINER.classList.add("modal_SubContainer")
  MODAL_CLOSEMODAL.innerHTML = "x"
  MODAL_CLOSEMODAL.classList.add("modal_CloseModal")
  MODAL_BACKGROUND_OVERLAY.classList.remove("modal_closed")

  MODAL_TITLE.innerHTML = title
  MODAL_TITLE.classList.add("modal_title") //mon titre qui change

  MODAL_MAIN_CONTENT = content //mon content qui change
 
  MODAL_LINE.classList.add("modal_Line")

  MODAL_BTN.classList.add("modal_btn")
  MODAL_BTN.innerHTML= button //mon button qui change

  MODAL_LOCATION.appendChild(MODAL_BACKGROUND_OVERLAY)
  MODAL_BACKGROUND_OVERLAY.appendChild(MODAL_WHITE_BACKGROUND)
  MODAL_WHITE_BACKGROUND.appendChild(MODAL_CLOSEMODAL)
  MODAL_WHITE_BACKGROUND.appendChild(MODAL_SUBCONTAINER)
  MODAL_SUBCONTAINER.appendChild(MODAL_TITLE)
  MODAL_SUBCONTAINER.appendChild(MODAL_MAIN_CONTENT)
  MODAL_SUBCONTAINER.appendChild(MODAL_LINE)
  MODAL_SUBCONTAINER.appendChild(MODAL_BTN)
}


function initModale(){
  BTN_MODIFIER.addEventListener("click", function(event){
    event.preventDefault()
    
    const modale_1_main_content = document.createElement("div")
    modale_1_main_content.classList.add("modale_1_main_content")
    /* modale_1_main_content.scr=xxxx */ //Ici, mettre la galerie photos 
    modaleTemplate("Galerie photo", modale_1_main_content, "Ajouter une photo")
  })
}

function closeModale(){
  MODAL_CLOSEMODAL.addEventListener("click", function() {
    MODAL_CLOSEMODAL.classList.remove("modal_CloseModal")
    MODAL_BACKGROUND_OVERLAY.classList.add("modal_closed")
  })
} 
closeModale()

  /* modaleTemplate("Ajout photo", MODALE_2_ET_3_MAIN_CONTENT, "Valider") */


/* function displayGallery(){

}
 */






