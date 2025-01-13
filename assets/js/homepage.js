// Renommer cette page modale ? 

import { fetchDataAPI, fetchCategoryAPI } from "./fetchPortfolio.js";
let DATA = await fetchDataAPI() 

let BTN_LOGIN = document.querySelector(".btn_loginLogout")
let MODALE_OPEN_BUTTON = document.createElement("a")

function main(){
  if (localStorage.getItem("token")) {
    createAdminLogout()
    createAdminModeEdition()
    createButtonOpenModale()
    initEvents()
    //listenerAdminCloseModale(modale_overlay)
  }
 else (console.log("error"))
} 
main()

//C'est ici que j'initialise tous mes évènements.
function initEvents(){
  BTN_LOGIN.addEventListener("click", function(){
    localStorage.removeItem("token")
    window.open("index.html","_self")
    createAdminLogout()
  })

  MODALE_OPEN_BUTTON.addEventListener("click", function(event){
    event.preventDefault()
    toggleModale()
    displayModaleCloseButton()
    handleModaleMainButton()
    createFixedContentModale()
    createTitleModale()
    displayGalleryModale()
  })



}

// Création du contenu du bouton Logout
function createAdminLogout(){
  BTN_LOGIN.innerHTML = "logout"
  BTN_LOGIN.classList.add("logout")
}

// Création de l'icône Mode Edition
function createAdminModeEdition(){
  let id_modeEdition = document.querySelector("#divModeEdition")
  let sous_div_modeEdition = document.createElement("div") 
  let icon_modeEdition = document.createElement("i")
  
  icon_modeEdition.classList.add("fa-regular", "fa-pen-to-square")
  sous_div_modeEdition.classList.add("sous_div_modeEdition")

  id_modeEdition.appendChild(sous_div_modeEdition)
  sous_div_modeEdition.appendChild(icon_modeEdition)
}

// Création du bouton d'ouverture de la modale
function createButtonOpenModale(){
  let retriveId = document.getElementById("modale_open_button")

  MODALE_OPEN_BUTTON.href='index.html'
  MODALE_OPEN_BUTTON.id = "a_modifier"
  MODALE_OPEN_BUTTON.classList.add("modale_open_button")

  let modifier_icone = document.createElement("i")
  modifier_icone.classList.add("fa-regular", "fa-pen-to-square")

  retriveId.appendChild(MODALE_OPEN_BUTTON)
  MODALE_OPEN_BUTTON.appendChild(modifier_icone)
}

//////////////////////* Etat 1 / état 2 //////////////////////////
function createTitleModale(){
  let modaleMainButton = document.getElementById("modaleMainButton")
  let modaleTitle = document.getElementById("modaleTitle")
  modaleTitle.classList.add("modaleTitle")
  modaleTitle.innerHTML = "Galerie photo"
  
  modaleMainButton.addEventListener("click", function(event){
    event.preventDefault
    modaleTitle.innerHTML = "Ajout photo"
  })
}

function createFixedContentModale(){
    let modaleMainContent = document.getElementById("modaleMainContent")
    modaleMainContent.classList.add("modaleMainContent")
    
    let modaleLine = document.getElementById("modaleLine")
    modaleLine.classList.add("modaleLine")
    
    let modaleCloseButton = document.getElementById("modaleCloseButton")
    modaleCloseButton.innerHTML = "x"
    modaleCloseButton.classList.add("modaleCloseButton")
} 


async function displayGalleryModale(){
    let modaleMainContent = document.getElementById("modaleMainContent")
    let galleryContainer_modale = document.createElement("div")
    galleryContainer_modale.classList.add("galleryContainer_modale_active")
    galleryContainer_modale.classList.remove("galleryContainer_modale_inactive")
    let containerImage
    let trashElement 
    let trashIcon
    let image

    for(let i=0;i <DATA.length;i++){
      containerImage = document.createElement("div")
      containerImage.classList.add("containerImage") 
      trashElement = document.createElement("a")
      trashIcon = document.createElement("i")
    
      image = document.createElement("img")
      image.src = DATA[i].imageUrl
      image.id = DATA[i].id
      //let imageId = DATA[i].id
      image.classList.add("galleryContainer_modale_image")    
      trashElement.classList.add("trashElement") 
      trashIcon.classList.add("fa-solid", "fa-trash", "trashIcon") 
      trashIcon.dataset.id = image.id  //pour chaque icon, met un id et associe-le à un id de l'image

      trashElement.addEventListener("click", function(event){
        removeImage(event)
      })

      modaleMainContent.appendChild(galleryContainer_modale)
      galleryContainer_modale.appendChild(containerImage)
      containerImage.appendChild(image)
      containerImage.appendChild(trashElement)
      trashElement.appendChild(trashIcon)
    } 

/*     let modaleMainButton = document.getElementById("modaleMainButton")
    modaleMainButton.addEventListener("click", function(event){
      event.preventDefault()
      galleryContainer_modale.classList.remove("galleryContainer_modale_active")
      galleryContainer_modale.classList.add("galleryContainer_modale_inactive")
    })

    let modale_close_button = document.getElementById("modaleCloseButton")
    modale_close_button.addEventListener("click", function(event){
      event.preventDefault()
      galleryContainer_modale.classList.remove("galleryContainer_modale_active")
      galleryContainer_modale.classList.add("galleryContainer_modale_inactive")
    }) */
}

// Gérer l'affichage ou non de la modale selon Manu
/* function toggleModale(){
  let modale = document.getElementById("modale")
  let modale_overlay = document.getElementById("modale_overlay")
  if (modale.classList.contains("modale")){
    modale.classList.remove("modale")
    modale_overlay.classList.remove("modale_overlay_active") 
  } else {
    modale.classList.add("modale")
    modale_overlay.classList.add("modale_overlay_active") 
  }
} */


//Si la modale contient la classe modale, alors tu me retires la classe.
function toggleModale(){
  let modale = document.getElementById("modale")
  let modale_overlay = document.getElementById("modale_overlay")
  if (modale.classList.contains("modale_active")){
    modale.classList.add("modale_inactive")
    modale_overlay.classList.add("modale_overlay_inactive") 
  } else {
    modale.classList.add("modale_active")
    modale_overlay.classList.add("modale_overlay_active") 
    modale.classList.remove("modale_inactive")
    modale_overlay.classList.remove("modale_overlay_inactive") 
  }
}

// Comportement du bouton fermé dans la modale
function displayModaleCloseButton(){
  let modale_close_button = document.getElementById("modaleCloseButton")
  modale_close_button.classList.add("modale_close_button_active")
}  





// Comportement du bouton principal de la modale
function handleModaleMainButton(){
  let modaleMainButton = document.getElementById("modaleMainButton")
  modaleMainButton.innerHTML = "Ajouter une photo"
  modaleMainButton.classList.remove("modaleMainButton_inactive")
  modaleMainButton.classList.add("modaleMainButton_active")
  modaleMainButton.addEventListener("click", function(event){
    event.preventDefault()
    modaleMainButton.innerHTML = "Valider"
    modaleMainButton.classList.remove("modaleMainButton_active")
    modaleMainButton.classList.add("modaleMainButton_inactive")
  })
}

// Comportement du bouton précédent (état 1 / état 2)
function modalePreviousButtonInactif(){
let modalePreviousButton = document.getElementById("modalePreviousButton")
modalePreviousButton.classList.add("modalePreviousButton_inactive")
 modalePreviousButton.classList.remove("modalePreviousButton_active")
}


function modalePreviousButtonActif(){
  let modalePreviousButton = document.getElementById("modalePreviousButton")
  modalePreviousButton.classList.remove("modalePreviousButton_inactive")
  modalePreviousButton.classList.add("modalePreviousButton_active")
}









/* 

function removeImage(event){
  console.log(event.target.dataset.id)
}

function displayAddPictureAndFormModale(){
  listenerAdminButtonPreviousModale()
  displayUploadPictureModale()
  displayUploadFormModale()
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
  let buttonMainModale = document.getElementById("modaleMainButton")
  buttonMainModale.addEventListener("Click", function(){
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
} */