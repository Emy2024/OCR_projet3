import { fetchDataAPI } from "./fetchPortfolio.js";
const URL_API = "http://localhost:5678/api/works" 
let DATA = await fetchDataAPI(URL_API) 

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

let MODALE_1_MAIN_CONTENT = document.createElement("div")
let MODALE_2_MAIN_CONTENT = document.createElement("div")
let MODALE_2_MAIN_CONTENT_UPLOAD = document.createElement("div")
let MODALE_2_MAIN_CONTENT_FORM = document.createElement("form")

function main(){
  if (sessionStorage.getItem("token")) {
    createElementModeEdition()
    createElementModifier() 
    
    initFirstModale()
    initSecondModale()
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


function initFirstModale(){
  BTN_MODIFIER.addEventListener("click", function(event){
    event.preventDefault()
    contentFirstModale()   
  })
}


{/* <i class="fa-solid fa-trash" style="color: #ffffff;"></i> */}



//Ici, ajouter bouton supprimer sur chaque photo (onEach ?)
function contentFirstModale(){
  
  MODALE_2_MAIN_CONTENT.innerHTML =""

  modaleTemplate("Galerie photo", MODALE_1_MAIN_CONTENT, "Ajouter une photo")

  let dataTable = []
  dataTable = DATA

  for (let i=0;i <dataTable.length;i++){
    let dataTableImages = dataTable[i].imageUrl
    //console.log(dataTableImages)
    
    MODALE_1_MAIN_CONTENT.classList.add("modale_1_main_content") 

    let modale_1_divForBinIcone = document.createElement("div")
    modale_1_divForBinIcone.classList.add("modale_1_divForBinIcone")

    let modale_1_galleryImage = document.createElement('img')
    modale_1_galleryImage.classList.add("modale_1_galleryImage")
    modale_1_galleryImage.src = dataTableImages


    MODALE_1_MAIN_CONTENT.appendChild(modale_1_galleryImage) 

} 

}



function initSecondModale(){
  MODAL_BTN.addEventListener("click", function(event){
    event.preventDefault()
    MODALE_1_MAIN_CONTENT.innerHTML =""
    contentSecondModale()
  })
}



function contentSecondModale(){
  modaleTemplate("Ajout photo", MODALE_2_MAIN_CONTENT, "Valider")
  
  MODALE_2_MAIN_CONTENT_UPLOAD.classList.add("modale_2_container_upload")
  MODALE_2_MAIN_CONTENT_FORM.classList.add("modale_2_form")

  contentSecondModaleForm("Titre ", "text")
  contentSecondModaleForm("Catégorie ", "select")

  MODALE_2_MAIN_CONTENT.appendChild(MODALE_2_MAIN_CONTENT_UPLOAD) 
  MODALE_2_MAIN_CONTENT.appendChild(MODALE_2_MAIN_CONTENT_FORM)
}


function contentSecondModaleForm(nameLabel, typeInput){

  let modale_2_container_label = document.createElement("label")
  modale_2_container_label.innerHTML= nameLabel
  let modale_2_container_input = document.createElement("input")
  modale_2_container_input.type = typeInput; 


  MODALE_2_MAIN_CONTENT_FORM.appendChild(modale_2_container_label)
  MODALE_2_MAIN_CONTENT_FORM.appendChild(modale_2_container_input)
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






