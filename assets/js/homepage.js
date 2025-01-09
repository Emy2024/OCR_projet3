// Renommer cette page modale ? 

import { fetchDataAPI, fetchCategoryAPI } from "./fetchPortfolio.js";
let DATA = await fetchDataAPI() 

let BTN_LOGIN = document.querySelector(".btn_loginLogout")
let BTN_OPENMODALE = document.createElement("a")

function main(){
  if (localStorage.getItem("token")) {
    createAdminLogout()
    listenerAdminLogout()
    createAdminModeEdition()
    createAdminButtonOpenModale()
    listenerAdminCloseModale(modaleCloseButton)
    //listenerAdminCloseModale(modale_overlay)
    listenerAdminButtonOpenModale()
  }
 else (console.log("error"))
} 
main()


function createAdminLogout(){
  BTN_LOGIN.innerHTML = "logout"
  BTN_LOGIN.classList.add("logout")
}

async function listenerAdminLogout(){
  BTN_LOGIN.addEventListener("click", function(){
    localStorage.removeItem("token")
    window.open("index.html","_self")
  })
}

function createAdminModeEdition(){
  let id_modeEdition = document.querySelector("#divModeEdition")
  let sous_div_modeEdition = document.createElement("div") 
  let icon_modeEdition = document.createElement("i")
  
  icon_modeEdition.classList.add("fa-regular", "fa-pen-to-square")
  sous_div_modeEdition.classList.add("sous_div_modeEdition")

  id_modeEdition.appendChild(sous_div_modeEdition)
  sous_div_modeEdition.appendChild(icon_modeEdition)
}

function createAdminButtonOpenModale(){
  let retriveId = document.getElementById("createButtonModifier")

  BTN_OPENMODALE.href='index.html'
  BTN_OPENMODALE.id = "a_modifier"
  BTN_OPENMODALE.classList.add("modifier_btn")

  let modifier_icone = document.createElement("i")
  modifier_icone.classList.add("fa-regular", "fa-pen-to-square")

  retriveId.appendChild(BTN_OPENMODALE)
  BTN_OPENMODALE.appendChild(modifier_icone)
}

function listenerAdminButtonOpenModale(){
  BTN_OPENMODALE.addEventListener("click", function(event){
    event.preventDefault()
    handleAdminButtonOpenModale()
  })
}   

function handleAdminButtonOpenModale(){
  displayOverlayModale()
  displayModale()
  createContentModale("Galerie photo")
  displayGalleryModale()
  listenerAdminButtonNextModale()
}

function listenerAdminCloseModale(trigger){
  trigger.addEventListener("click", function(){
    let modale = document.getElementById("modale")
    modale.classList.remove("modale")
    modale.classList.add("modale_inactive")
    
    let modale_overlay = document.getElementById("modale_overlay")
    modale_overlay.classList.remove("modale_overlay_active") 
  })
}

function listenerAdminButtonNextModale(){
  let modaleButton = document.getElementById("modaleButton")
  modaleButton.classList.add("modaleButton_active")
  modaleButton.innerHTML = "Ajouter une photo"
  modaleButton.addEventListener("click", function(event){
    event.preventDefault()
    handleAdminButtonNextModale()
  })
}

function handleAdminButtonNextModale(){
  displayOverlayModale()
  displayModale()
  createContentModale("Ajout photo")
  listenerAdminButtonNextModale("Ajouter une photo")
  displayAddPictureAndFormModale()
}

function listenerAdminButtonPreviousModale(){
  let previousButton = document.getElementById("modalePreviousButton")
  previousButton.classList.add("fa-solid", "fa-arrow-left", "previousButton")
  previousButton.addEventListener("click", function(event){
    event.preventDefault()
    handleAdminButtonPreviousModale()
  })
}

function handleAdminButtonPreviousModale(){
  displayOverlayModale()
  displayModale()
  createContentModale("Ajout photo")
  displayGalleryModale()
} 

function displayOverlayModale(){
  let modale_overlay = document.getElementById("modale_overlay")
  modale_overlay.classList.add("modale_overlay_active") 
}

function displayModale(){
  let modale = document.getElementById("modale")
  modale.classList.add("modale")
  modale.classList.remove("modale_inactive")
}

function createContentModale(titleModale){
  let modaleTitle = document.getElementById("modaleTitle")
  modaleTitle.classList.add("modaleTitle")
  modaleTitle.innerHTML = titleModale

  let modaleMainContent = document.getElementById("modaleMainContent")
  modaleMainContent.classList.add("modaleMainContent")
  modaleMainContent.innerHTML = ""
  
  let modaleLine = document.getElementById("modaleLine")
  modaleLine.classList.add("modaleLine")
  
  let modaleCloseButton = document.getElementById("modaleCloseButton")
  modaleCloseButton.innerHTML = "x"
  modaleCloseButton.classList.add("modaleCloseButton")
}

async function displayGalleryModale(){
  
  let previousButton = document.getElementById("modalePreviousButton")
  previousButton.classList.remove("fa-solid", "fa-arrow-left", "previousButton")

  let modaleMainContent = document.getElementById("modaleMainContent")

  let galleryContainer_modale = document.createElement("div")
  galleryContainer_modale.classList.add("galleryContainer_modale")
  galleryContainer_modale.innerHTML=""
  
  for(let i=0;i <DATA.length;i++){
    let containerImage = document.createElement("div")
    containerImage.classList.add("containerImage") 
    let trashElement = document.createElement("a")
    let trashIcon = document.createElement("i")
  
    let image = document.createElement("img")
    image.src = DATA[i].imageUrl
    //image.id = DATA[i].id
    let imageId = DATA[i].id
    image.classList.add("galleryContainer_modale_image")    
    trashElement.classList.add("trashElement") 
    trashIcon.classList.add("fa-solid", "fa-trash", "trashIcon") 
    trashIcon.dataset.id = image.id  //pour chaque icon, met un id et associe-le à un id de l'image

    modaleMainContent.appendChild(galleryContainer_modale)
    galleryContainer_modale.appendChild(containerImage)
    containerImage.appendChild(image)
    containerImage.appendChild(trashElement)
    trashElement.appendChild(trashIcon)
  }
  
}

function listenerAdminButtonValidateUploadModale(){
  let modaleButton = document.getElementById("modaleButton")
  modaleButton.classList.add("modaleButton_inactive")
  modaleButton.innerHTML = "Ajouter une photo"
  modaleButton.addEventListener("click", function(event){
    event.preventDefault()
    handleAdminButtonNextModale()
  })
}

function displayAddPictureAndFormModale(){
  listenerAdminButtonPreviousModale()
  displayUploadPictureModale()
  displayUploadFormModale()
  listenerAdminButtonValidateUploadModale()
}

function displayUploadPictureModale(){
  let modaleMainContent = document.getElementById("modaleMainContent")
  
  let modaleUpload = document.createElement("div")
  modaleUpload.classList.add("modaleUpload") 

  let modaleUpload_icon = document.createElement("i")
  modaleUpload_icon.classList.add("fa-regular", "fa-image", "modaleUpload_icon") 
  
  let modaleUpload_btn_input = document.createElement("input")
  modaleUpload_btn_input.type = "file"
  modaleUpload_btn_input.type = "file"
  modaleUpload_btn_input.classList.add("modaleUpload_btn_input")

  let modaleUpload_btn = document.createElement("button")
  modaleUpload_btn.innerHTML = "+ Ajouter photo"
  modaleUpload_btn.classList.add("modaleUpload_btn")

  listenerUploadImage(modaleUpload_btn, modaleUpload_btn_input)

  let modaleUpload_paragraph = document.createElement("p")
  modaleUpload_paragraph.innerHTML = "jpg, png : 4mo max"
  modaleUpload_paragraph.classList.add("modaleUpload_paragraph") 

  modaleMainContent.appendChild(modaleUpload)
  modaleUpload.appendChild(modaleUpload_icon)
  modaleUpload.appendChild(modaleUpload_btn)
  modaleUpload.appendChild(modaleUpload_paragraph)
}

function listenerUploadImage(button, buttonInput){
  button.addEventListener("click", function(){
    buttonInput.click()
  })
}

async function displayUploadFormModale(){
  let modaleMainContent = document.getElementById("modaleMainContent")
  let modaleForm = document.createElement("form")
  modaleForm.classList.add("modaleForm")

  let updateContentForm_title = document.createElement("label")
  updateContentForm_title.innerHTML= "Titre"

  let updateContentForm_input = document.createElement("input")

  let updateContentForm_category = document.createElement("label")
  updateContentForm_category.innerHTML= "Catégorie"

  let updateContentForm_select = document.createElement("select")

  listenerCategory(updateContentForm_select)
  extractCategory(updateContentForm_select)
  listenerError()

  modaleMainContent.appendChild(modaleForm)
  modaleForm.appendChild(updateContentForm_title)
  modaleForm.appendChild(updateContentForm_input)
  modaleForm.appendChild(updateContentForm_category)
  modaleForm.appendChild(updateContentForm_select)
}

function listenerCategory(trigger){
  trigger.addEventListener("click", function(event){  
    event.preventDefault()
  })
}

async function extractCategory(trigger){

  let data_api_category = await fetchCategoryAPI()
  
  let category = []
  category.innerHTML = ""
    
  for (let i =0; i < data_api_category.length;i++){
    
    category = data_api_category[i].name
    let updateContentForm_select_option = document.createElement("option"); 

    updateContentForm_select_option.value = category
    updateContentForm_select_option.textContent = category
    trigger.appendChild(updateContentForm_select_option)
  }
}

function listenerError(){
  let buttonModale = document.getElementById("modaleButton")
  buttonModale.addEventListener("Click", function(){
    alert("error!")
})
}

function errorEmptyFields(){
  const valueEmpty = updateContentForm_input.value
  if (valueEmpty === ""){
    let paragraphErrorEmptyFields = document.createElement("p")
    paragraphErrorEmptyFields.innerHTML = "Merci de compléter tous les champs !"
    paragraphErrorEmptyFields.classList.add("paragraphErrorEmptyFields")
  }
}