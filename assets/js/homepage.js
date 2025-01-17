import { fetchDataAPI, fetchCategoryAPI, imageDelete } from "./fetchPortfolio.js";
let DATA = await fetchDataAPI() 
let DATA_CATEGORY = await fetchCategoryAPI() 

let BTN_LOGIN = document.querySelector(".btn_loginLogout")
let MODALE_OPEN_BUTTON = document.createElement("a")

function main(){
  if (localStorage.getItem("token")) {
    createAdminLogout()
    createAdminModeEdition()
    createButtonOpenModale()
    modale("modale_inactive", "modale_active")
    modaleCloseButton()
    initEvents()
  }
 else {
  console.log("error")
  }
} 
main()

//C'est ici que j'initialise tous mes évènements.
function initEvents(){
  
  // Ce que je vois quand je clique sur le bouton login
  BTN_LOGIN.addEventListener("click", function(){
    localStorage.removeItem("token")
    window.open("index.html","_self")
    createAdminLogout()
  })

  // Ce que je vois quand je clique sur le bouton pour ouvrir la modale
  MODALE_OPEN_BUTTON.addEventListener("click", function(event){
    event.preventDefault()
    showGalleryModale()
  })

  // Ce que je vois quand je clique sur le bouton principal de la modale
  let modaleMainButton = document.getElementById("modaleMainButton")
  modaleMainButton.addEventListener("click", function(event){
    event.preventDefault()
    modaleTitle("Ajout photo")
    modaleMainButtonContent();
    modalePreviousButton()
    createGalleryModale("galleryContainer_modale_inactive", "galleryContainer_modale_active")
    createUploadModale("uploadModale_active", "uploadModale_inactive")
    createUploadModaleFORM("formModale_active", "formModale_inactive")
  })

  // Ce que je vois quand je clique sur le bouton "fermé" de la modale
  let modale_close_button = document.getElementById("modaleCloseButton")
    modale_close_button.addEventListener("click", function(){
      modaleOverlay("modale_overlay_inactive", "modale_overlay_active")
      modale("modale_inactive", "modale_active")
  })

  // Ce que je vois quand je clique sur le bouton "précédent" de la modale
  let modale_previous_button = document.getElementById("modalePreviousButton")
  modale_previous_button.addEventListener("click", function(){
    modaleTitle("Galerie photo")
    createGalleryModale("galleryContainer_modale_active", "galleryContainer_modale_inactive")
    modaleMainButtonContent();
    modalePreviousButton()
    modaleCloseButton()
    createUploadModale("uploadModale_inactive", "uploadModale_active")
    createUploadModaleFORM("formModale_inactive", "formModale_active")
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

function showGalleryModale(){
  modaleOverlay("modale_overlay_active", "modale_overlay_inactive")
  modale("modale_active", "modale_inactive")
  createFixedContentModale()
  modaleTitle("Galerie photo")
  createGalleryModale("galleryContainer_modale_active", "galleryContainer_modale_inactive")
  modaleCloseButton()
  modalePreviousButton()
  modaleMainButtonContent();
  createUploadModale("uploadModale_inactive", "uploadModale_active")
  createUploadModaleFORM("formModale_inactive", "formModale_active")
}




// Comportement de l'arrière plan de la modale
function modaleOverlay(classToAdd, classToRemove){
  let modale_overlay = document.getElementById("modale_overlay")
  modale_overlay.classList.add(classToAdd)
  modale_overlay.classList.remove(classToRemove)
} 

// Comportement de la modale
function modale(classToAdd,classToRemove){
  let modale = document.getElementById("modale")
  modale.classList.add(classToAdd)
  modale.classList.remove(classToRemove)
}

//Titre de la modale
function modaleTitle(text){
  let modaleTitle = document.getElementById("modaleTitle")
  modaleTitle.innerHTML = text
  modaleTitle.classList.add("modaleTitle")
}

// Comportement du bouton fermé dans la modale
function modaleCloseButton(){
  let modale = document.getElementById("modale")
  let modale_close_button = document.getElementById("modaleCloseButton")
  if (modale.classList.contains("modale_inactive")){
    modale_close_button.classList.remove("modale_close_button_active")
    modale_close_button.classList.add("modale_close_button_inactive")
  } else {
    modale_close_button.classList.add("modale_close_button_active")
    modale_close_button.classList.remove("modale_close_button_inactive")
  }
}  

// Création des éléments fixes de la modale (localisation du contenu dynamique, ligne et bouton fermé)
function createFixedContentModale(){
    let modaleMainContent = document.getElementById("modaleMainContent")
    modaleMainContent.classList.add("modaleMainContent")
    
    let modaleLine = document.getElementById("modaleLine")
    modaleLine.classList.add("modaleLine")
    
    let modaleCloseButton = document.getElementById("modaleCloseButton")
    modaleCloseButton.innerHTML = "x"
    modaleCloseButton.classList.add("modale_close_button_active")
} 

// Création et comportement de la gallerie photo dans la modale; 
async function createGalleryModale(classToAdd, classToRemove){
    let galleryContainer_modale = document.getElementById("galleryContainer_modale")
    galleryContainer_modale.innerHTML = ""
    galleryContainer_modale.classList.add(classToAdd)
    galleryContainer_modale.classList.remove(classToRemove)
      
    let containerImage
    let trashElement 
    let trashIcon
    let image
   
    for(let i=0;i <DATA.length;i++){
      containerImage = document.createElement("div")
      containerImage.classList.add("containerImage") 
      containerImage.id = "containerImageModale_"+DATA[i].id
      trashElement = document.createElement("a")
      trashIcon = document.createElement("i")
    
      image = document.createElement("img")
      image.src = DATA[i].imageUrl
      //console.log(image.src)
      image.id = DATA[i].id // tous les id de mes images
  
      image.classList.add("galleryContainer_modale_image")  

      trashElement.classList.add("trashElement") 
      trashIcon.classList.add("fa-solid", "fa-trash", "trashIcon") 
      trashIcon.dataset.id = image.id  //pour chaque icon, met un id et associe-le à un id de l'image

      trashElement.addEventListener("click", function(event){
        console.log("Si je clique sur le trash, l'id de la photo est : ", event.target.dataset.id)
        imageDelete(event.target.dataset.id, image)
      }) 

      galleryContainer_modale.appendChild(containerImage)
      containerImage.appendChild(image)
      containerImage.appendChild(trashElement)
      trashElement.appendChild(trashIcon)
    }
}

// Gestion du bouton principal de la modale en fonction du titre de la modale :
function modaleMainButtonContent() {
  let modaleMainButton = document.getElementById("modaleMainButton");
  let modaleTitle = document.getElementById("modaleTitle")
  
  if(modaleTitle.innerHTML === "Galerie photo"){
    modaleMainButton.innerHTML = "Ajouter une photo";
    modaleMainButton.classList.remove("modaleMainButton_inactive");
    modaleMainButton.classList.add("modaleMainButton_active");
  } else {
    modaleMainButton.innerHTML = "Valider";
    modaleMainButton.classList.remove("modaleMainButton_active");
    modaleMainButton.classList.add("modaleMainButton_inactive");
  }
}
  
// Gestion du bouton précédent en fonction du titre de la modale :
function modalePreviousButton(){
  let modalePreviousButton = document.getElementById("modalePreviousButton")
  let modaleTitle = document.getElementById("modaleTitle")
 
  if(modaleTitle.innerHTML === "Galerie photo"){
    modalePreviousButton.classList.remove("fa-solid", "fa-arrow-left")
    modalePreviousButton.classList.remove("modale_previous_button_active")
    modalePreviousButton.classList.add("modale_previous_button_inactive")
  } else {
    modalePreviousButton.classList.add("fa-solid", "fa-arrow-left")
    modalePreviousButton.classList.add("modale_previous_button_active")
    modalePreviousButton.classList.remove("modale_previous_button_inactive")
  }
}

// Création de la partie upload dans la modale
function createUploadModale(classToAdd, classToRemove){
  let upload_modale = document.getElementById("upload_modale")
  upload_modale.innerHTML = ""
  upload_modale.classList.add(classToAdd) 
  upload_modale.classList.remove(classToRemove) 

  let upload_modale_icon = document.createElement("i")
  upload_modale_icon.classList.add("fa-regular", "fa-image", "upload_modale_icon") 
  
  let upload_modale_button = document.createElement("button")
  upload_modale_button.innerHTML = "+ Ajouter photo"
  upload_modale_button.classList.add("upload_modale_button")

 // input.type="file" va créer automatiquement un bouton Browser.Je dois donc le cacher
  let upload_modale_input = document.createElement("input")
  upload_modale_input.type = "file" 
  upload_modale_input.accept="image/*"
  upload_modale_input.style.display = 'none'
  upload_modale_input.id ="upload_modale_input_id"

  let previewNewPicture = document.createElement("div")

  //J'assigne mon nouveau bouton à l'input caché et je lis le fichier
  upload_modale_button.addEventListener("click", function(){
    let input = document.getElementById("upload_modale_input_id")
    input.click()

    let file = input.files[0] // récupère le fichier sélectionné
    
    if (file && file.type.startsWith('image/')) {  // Vérifie que c'est une image
      let reader = new FileReader() // Crée le lecteur de fichier
      
      reader.onload = function(event){
        let newImage = document.createElement('img')
        newImage.src = event.target.result
        upload_modale.appendChild(previewNewPicture)

        previewNewPicture = ""
        previewNewPicture.appendChild(img)
      }
    }
    })
 /*   
    reader.onload = function(event) {
      let img = document.createElement('img')
      img.src = event.target.result
      upload_modale.appendChild(img) 
    } */


  //listenerUploadImage(modaleUpload_btn, modaleUpload_btn_input)

  let upload_modale_paragraph = document.createElement("p")
  upload_modale_paragraph.innerHTML = "jpg, png : 4mo max"
  upload_modale_paragraph.classList.add("upload_modale_paragraph") 
  upload_modale.appendChild(upload_modale_icon)
  upload_modale.appendChild(upload_modale_button)
  upload_modale_button.appendChild(upload_modale_input)
  upload_modale.appendChild(upload_modale_paragraph)

} 

// Création de la partie form upload dans la modale (formulaire)
function createUploadModaleFORM(classToAdd, classToRemove){
  let upload_modale_form = document.getElementById("upload_modale_form")
  upload_modale_form.innerHTML = ""
  upload_modale_form.classList.add(classToAdd) 
  upload_modale_form.classList.remove(classToRemove) 
 
  let modaleForm_title_label = document.createElement("label")
  modaleForm_title_label.innerHTML= "Titre"
  modaleForm_title_label.classList.add("modaleForm_label")

  let modaleForm_title_input = document.createElement("input")
  modaleForm_title_input.classList.add("modaleForm_input")

  let modaleForm_title_category = document.createElement("label")
  modaleForm_title_category.innerHTML= "Catégorie"
  modaleForm_title_category.classList.add("modaleForm_label")

  let modaleForm_selectCategory = document.createElement("select")
  modaleForm_selectCategory.classList.add("modaleForm_input")

  extractCategoryModale(modaleForm_selectCategory)

  upload_modale_form.appendChild(modaleForm_title_label)
  upload_modale_form.appendChild(modaleForm_title_input)
  upload_modale_form.appendChild(modaleForm_title_category)
  upload_modale_form.appendChild(modaleForm_selectCategory) 
}

// Extraction des catégories pour la partie form upload dans la modale (formulaire)
 async function extractCategoryModale(parentElement){
  for (let i = 0; i < DATA_CATEGORY.length; i++) {
    let category = DATA_CATEGORY[i].name;
    let modaleForm_category_option = document.createElement("option")
    modaleForm_category_option.value = category
    modaleForm_category_option.textContent = category   
    parentElement.appendChild(modaleForm_category_option)
  }
}













/* 

function errorEmptyFields(){
  const valueEmpty = updateContentForm_input.value
  if (valueEmpty === ""){
    let paragraphErrorEmptyFields = document.createElement("p")
    paragraphErrorEmptyFields.innerHTML = "Merci de compléter tous les champs !"
    paragraphErrorEmptyFields.classList.add("paragraphErrorEmptyFields")
  }
} */
















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