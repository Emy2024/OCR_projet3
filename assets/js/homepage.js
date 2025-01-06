import { fetchDataAPI } from "./fetchPortfolio.js";

const URL_API = "http://localhost:5678/api/works" 
let DATA = await fetchDataAPI(URL_API) 

let URL_DATA_CATEGORIES = await fetchDataAPI("http://localhost:5678/api/categories") 
console.log("Mes catégories récupérées : ", URL_DATA_CATEGORIES)


let BTN_OPEN_MODAL_DISPLAY_GALLERY = document.createElement("a")
BTN_OPEN_MODAL_DISPLAY_GALLERY.id = "a_modifier"
let BTN_LOGIN = document.querySelector(".login")

let MODAL_BACKGROUND_OVERLAY = document.createElement("div")
let MODAL_BTN = document.createElement("button")
let MODAL_CLOSE = document.createElement("p")

let MODAL_CONTENT_DISPLAY_GALLERY = document.createElement("div")

let MODAL_CONTENT_UPDATE_GALLERY = document.createElement("div")
let MODAL_CONTENT_UPDATE_GALLERY_FORM = document.createElement("form")


function main(){
  if (localStorage.getItem("token")) {
    createLogout()
    createElementModeEdition()
    createElementModifier() 
    initEvents(DATA)
  }
 else (console.log("error"))
}
main()

function createLogout(){
  BTN_LOGIN.innerHTML = "logout"
  BTN_LOGIN.classList.add("logout")
}

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

  BTN_OPEN_MODAL_DISPLAY_GALLERY.href='index.html'
  let i_modifier_icone = document.createElement("i")
 
  i_modifier_icone.classList.add("fa-regular", "fa-pen-to-square")
  BTN_OPEN_MODAL_DISPLAY_GALLERY.classList.add("modifier_btn")

  id_mesProjets.appendChild(BTN_OPEN_MODAL_DISPLAY_GALLERY)
  BTN_OPEN_MODAL_DISPLAY_GALLERY.appendChild(i_modifier_icone)
}


// sortis de la fonction modalTemplate
let modal_white_background = document.createElement("div")
let modal_line = document.createElement("div")
let modal_title = document.createElement("p")
let modal_subcontainer = document.createElement("div")
let modal_main_content = document.createElement("div")

function modalTemplate(title, contentModal, button){

  let modal_location = document.getElementById("modal")

  modal_main_content = contentModal //mon content qui change

  MODAL_BACKGROUND_OVERLAY.classList.remove("modal_closed")
  MODAL_BACKGROUND_OVERLAY.classList.add("modal_backgroundOverlay")
  MODAL_CLOSE.classList.add("modal_CloseModal")
  modal_subcontainer.classList.add("modal_SubContainer")
  modal_white_background.classList.add("modal_WhiteBackground")
  modal_title.classList.add("modal_title") //mon titre qui change
  modal_title.innerHTML = title
  modal_line.classList.add("modal_Line")

  MODAL_CLOSE.innerHTML = "x"
  MODAL_BTN.innerHTML= button //mon button qui change

  modal_location.appendChild(MODAL_BACKGROUND_OVERLAY)
  MODAL_BACKGROUND_OVERLAY.appendChild(modal_white_background)
  modal_white_background.appendChild(MODAL_CLOSE)
  modal_white_background.appendChild(modal_subcontainer)
  modal_subcontainer.appendChild(modal_title)
  modal_subcontainer.appendChild(modal_main_content)
  modal_subcontainer.appendChild(modal_line)
  modal_subcontainer.appendChild(MODAL_BTN)
}

async function initEvents(){
  BTN_LOGIN.addEventListener("click", function(){
    localStorage.removeItem("token")
    window.open("index.html","_self")
  })

  // Première modal
  BTN_OPEN_MODAL_DISPLAY_GALLERY.addEventListener("click", function(event){
    event.preventDefault() 
    constructionModalDisplayGallery()
  })

  // Seconde modal
  MODAL_BTN.addEventListener("click", function(event){
    event.preventDefault()
    constructionModalUpdateGallery()
  })

  MODAL_CLOSE.addEventListener("click", function() {
    MODAL_CLOSE.classList.remove("modal_CloseModal")
    MODAL_BACKGROUND_OVERLAY.classList.add("modal_closed")
  })
}


// Première modal
async function constructionModalDisplayGallery(){

  MODAL_CONTENT_UPDATE_GALLERY.innerHTML = ""

  modalTemplate("Galerie photo", MODAL_CONTENT_DISPLAY_GALLERY, "Ajouter une photo")
  
  MODAL_CONTENT_DISPLAY_GALLERY.classList.add("modal_content_display_gallery") 

  for (let i=0;i <DATA.length;i++){
    let containerGallery = document.createElement('div')
    let containerImage = document.createElement('div')
    let image = document.createElement('img')
    let a_trash = document.createElement("a")
    let i_trash = document.createElement("i")

    containerGallery.classList.add("containerGallery")
    containerImage.classList.add("containerImage")
    image.classList.add("image")
    a_trash.classList.add("a_trash") 
    i_trash.classList.add("fa-solid", "fa-trash", "i_trash") 

    image.src = DATA[i].imageUrl
    
    // Ici, ajouter la suppression de données Fetch DELETE

    MODAL_CONTENT_DISPLAY_GALLERY.appendChild(containerGallery)
    containerGallery.appendChild(containerImage)
    containerGallery.appendChild(a_trash)
    a_trash.appendChild(i_trash)
    containerImage.appendChild(image)
  } 

  MODAL_BTN.classList.remove("modal_btn_not_activated")
  MODAL_BTN.classList.add("modal_btn")
}

// Seconde modal
function constructionModalUpdateGallery(){
  
  MODAL_CONTENT_DISPLAY_GALLERY.innerHTML = ""

  modalTemplate("Ajout photo", MODAL_CONTENT_UPDATE_GALLERY, "Valider")
  
  let MODAL_CONTENT_UPDATE_GALLERY_UPLOAD = document.createElement("div")
  MODAL_CONTENT_UPDATE_GALLERY_UPLOAD.classList.add("modal_content_update_gallery_upload") 
  MODAL_CONTENT_UPDATE_GALLERY_FORM.innerHTML =""
  MODAL_CONTENT_UPDATE_GALLERY_FORM.classList.add("modale_2_form")

  let modal_content_update_gallery_upload_icon = document.createElement("i")
  let modal_content_update_gallery_upload_btn = document.createElement("button")
  let modal_content_update_gallery_upload_paragraph = document.createElement("p")
  
  modal_content_update_gallery_upload_icon.classList.add("fa-regular", "fa-image", "modal_content_update_gallery_upload_icon") 

  modal_content_update_gallery_upload_btn.innerHTML = "+ Ajouter photo"
  modal_content_update_gallery_upload_btn.classList.add("modal_content_update_gallery_upload_btn")

  modal_content_update_gallery_upload_paragraph.innerHTML = "jpg, png : 4mo max"
  modal_content_update_gallery_upload_paragraph.classList.add("modal_content_update_gallery_upload_paragraph") 

  updateContentForm()

  MODAL_CONTENT_UPDATE_GALLERY.appendChild(MODAL_CONTENT_UPDATE_GALLERY_UPLOAD) 
  MODAL_CONTENT_UPDATE_GALLERY_UPLOAD.appendChild(modal_content_update_gallery_upload_icon) 
  MODAL_CONTENT_UPDATE_GALLERY_UPLOAD.appendChild(modal_content_update_gallery_upload_btn) 
  MODAL_CONTENT_UPDATE_GALLERY_UPLOAD.appendChild(modal_content_update_gallery_upload_paragraph) 
  MODAL_CONTENT_UPDATE_GALLERY.appendChild(MODAL_CONTENT_UPDATE_GALLERY_FORM)

  MODAL_BTN.classList.remove("modal_btn")
  MODAL_BTN.classList.add("modal_btn_not_activated")
}


function updateContentForm(){
  let updateContentForm_label_1 = document.createElement("label")
  updateContentForm_label_1.innerHTML= "Titre"

  let updateContentForm_input = document.createElement("input")

  let updateContentForm_label_2 = document.createElement("label")
  updateContentForm_label_2.innerHTML= "Catégorie"

  let updateContentForm_select = document.createElement("select")
  updateContentForm_select.id ='modale_2_container_select_1'
  
  let categories_uniques = []

  // Au click, extraction des catégories
  updateContentForm_select.addEventListener("click", function(){
  
    categories_uniques.textContent = ""
    
    for (let i =0; i < URL_DATA_CATEGORIES.length;i++){
    categories_uniques = URL_DATA_CATEGORIES[i].name
    let updateContentForm_select_option = document.createElement("option"); 

    updateContentForm_select_option.value = categories_uniques
    updateContentForm_select_option.textContent = categories_uniques
    updateContentForm_select.appendChild(updateContentForm_select_option)
    }
  })
 
  MODAL_CONTENT_UPDATE_GALLERY_FORM.appendChild(updateContentForm_label_1)
  MODAL_CONTENT_UPDATE_GALLERY_FORM.appendChild(updateContentForm_input)

  MODAL_CONTENT_UPDATE_GALLERY_FORM.appendChild(updateContentForm_label_2)
  MODAL_CONTENT_UPDATE_GALLERY_FORM.appendChild(updateContentForm_select)

}



  /* modaleTemplate("Ajout photo", MODALE_2_ET_3_MAIN_CONTENT, "Valider") */








