import { create } from "../../crud/index.js"
import { WORKS, CATEGORIES } from "../../../index.js"
import * as modaleConfirmed from "../post_modale/index.js"
import * as Portfolio from "../../portfolio/index.js"
import * as Modale from "../main_modale/displayGallery.js"
import * as ModaleDisplay from "../main_modale/displayModale.js"

let FILE=null

export function main() {
    initEvents()
    initCategories()
}

function initEvents() {
  try { 
    // *** Passage modale précédente ***// 
    let modale_previous_button = document.querySelector(".modale_previous_button")
        modale_previous_button.addEventListener("click", function(){
          ModaleDisplay.toggleShowModaleAndOverlayMG(true)
          ModaleDisplay.toggleShowModaleAndOverlayMF(false)
          Modale.createGalleryModale()
          reinitializeForm() 
        })
    
    // ******************* Fermeture modale au clic sur l'overlay mf *******************// 
    let modale_overlay_mf = document.getElementById("modale_overlay_mf")
        modale_overlay_mf.addEventListener("click", function(){
          ModaleDisplay.toggleShowModaleAndOverlayMG(false)
          ModaleDisplay.toggleShowModaleAndOverlayMF(false)
          reinitializeForm() 
        })

    // *** Au clic sur le bouton "valider", appelle la fonction fetch avec les nouvelles informations ***// 
    let btnSubmit = document.getElementById("mf_btn_valid")
        btnSubmit.addEventListener("click", function (event) {
          //console.log("submit event")
          event.preventDefault()
          sendForm()
          ModaleDisplay.toggleShowModaleAndOverlayMG(true)
          ModaleDisplay.toggleShowModaleAndOverlayMF(false)
          Modale.createGalleryModale()
        }) 

    // *** En cliquant sur upload, assigne le file input***// 
    let upload_button = document.getElementById("upload_button")
        upload_button.addEventListener("click", function(event){
          event.preventDefault()
          clickFileInput()
        })

    // *** Traitement et vérification du file input ***// 
    let file_input = document.getElementById("file_input")
        file_input.addEventListener("change", function(event){
          handleNewPicture(event)
          checkForm()
        })
    
    // *** Vérification de l'input title ***// 
    let title_input = document.getElementById("modaleForm_input_title")
        title_input.addEventListener("input",(event)=>{
          checkForm()
        })
    
        
    // *** Vérification de l'input select : non, pas d'addEventListener ***// 
    let select_input = document.getElementById("modaleForm_input_select")
        select_input.addEventListener("click", function(event){
          event.preventDefault()
          checkForm()
        }) 

    // *** Changement de la photo récupérée ***//    
    let image_overview = document.getElementById('image_overview') 
        image_overview.addEventListener("click", function(event){
          file_input.click()
            reinitializeForm() 
            handleNewPicture(event)
            checkForm()
          })
    
        
  } catch (e) {
    console.log("edit_modale > initEvents ", e)
  }
}

// *** Ajout du click pour récupérer des fichiers ***// 
function clickFileInput(){
  let file_input = document.getElementById("file_input")
      file_input.click()
} 

// *** Gestion de la photo récupérée ***// 
function handleNewPicture(event){
  if(event.target.files.length==0) {
    return
  }

  FILE = event.target.files[0]  
  let image_overview = document.getElementById('image_overview')
  let reader = new FileReader()
  reader.onload = (event) => {
    image_overview.src = event.target.result
    image_overview.classList.add("image_overview")
    image_overview.style.display="flex"
  }
  reader.readAsDataURL(FILE)
}

// *** Initialise les catégories dans select ***// 
function initCategories (){
  let select = document.getElementById("modaleForm_input_select")
      select.innerHTML=""

  let element = document.createElement("option")
      element.value = ""
      element.textContent = ""
  
  select.appendChild(element)

  for(let i=0;i<CATEGORIES.length;i++) {
    element = document.createElement("option")
    element.value = CATEGORIES[i].id
    element.textContent = CATEGORIES[i].name
    select.appendChild(element)
  }
}

// ************************ Envoi du formulaire au backend ****************************// 
async function sendForm() {
  // *** checkForm ***// 
  if(checkForm()==false) return

  // *** Envoie des infos au backend ***// 
  let work = await create.postData(getFormData())
  console.log("Données reçues : ", work.title)

  // *** réinitialisation du formulaire ***// 
  reinitializeForm()
  modaleConfirmed.showConfirmModale()
  
  // *** maj WORKS ***// 
  WORKS.push(work)

  // *** maj immédiate de GALLERIE homepage ***// 
  Portfolio.createGallery(WORKS)

  // *** maj immédiate de GALLERIE modale ***// 
  Modale.createGalleryModale()
}

// *** Réinitilisation du formulaire (utile si on clique sur "fermé" ou "précédent" ***// 
export function reinitializeForm() {
  FILE= null
  let upload_modale_sub_container_picture = document.getElementById("upload_modale_sub_container_picture")
  let title=document.getElementById("modaleForm_input_title")
      title.value=""
  let image_overview = document.getElementById('image_overview')
      image_overview.style.display ="none"
  initCategories ()
  hideErrorTitle()
  hideErrorCategory()
  hideErrorFile()
  hideErrorSizeImage()
  disabledSubmitBtn()
  upload_modale_sub_container_picture.style.display="flex"
}

// *** Collecte des données à envoyer dans le formulaire (charge utile) ***// 
function getFormData() {
  let title=document.getElementById("modaleForm_input_title")
  let select=document.getElementById("modaleForm_input_select")

  console.log(FILE)

  const formData = new FormData()
        formData.append('image', FILE)
        formData.append('title', title.value)
        formData.append('category',  select.value)

  console.log(formData)

  return formData
}

// *** Vérifie si erreurs dans le formulaire ***// 
function checkForm(){
  console.log('inside check form')
  let title=document.getElementById("modaleForm_input_title")
  let select = document.getElementById("modaleForm_input_select")
  let upload_modale_sub_container_picture = document.getElementById("upload_modale_sub_container_picture")
  let valid=true

  disabledSubmitBtn()

  if (FILE.size > 4 * 1024 * 1024) { 
    showErrorSizeImage()
    valid=false
  } else if(FILE==null){
    showErrorFile()
    valid= false
  } else {
    hideErrorFile()
    hideErrorSizeImage()
    upload_modale_sub_container_picture.style.display = "none"
  }   

  if(title.value=="" || title.value==null || title.value.trim()=="") {   
    showErrorTitle()
    valid= false
  } else {
    hideErrorTitle()
  }
 
  if(select.value == "" || select.value == null){
    showErrorCategory()
    valid= false
  } else {
    hideErrorCategory()
  }

  if(valid ){
    enableSubmitBtn()
  }

  return valid
}


// ***Gestion des erreurs du formulaire upload ***// 

// *** Affiche une erreur sur l'input catégorie du formulaire upload ***// 
function showErrorCategory(){
  let error_select = document.getElementById("error_select")
      error_select.style.display="flex"
}
  
// *** Cache une erreur sur l'input catégorie du formulaire upload ***// 
function hideErrorCategory(){
  let error_select = document.getElementById("error_select")
      error_select.style.display="none"
}
    
// *** Affiche une erreur sur le titre du formulaire upload ***// 
function showErrorTitle(){
  let error_title = document.getElementById("error_title")
      error_title.style.display="flex"
}
  
// *** Cache une erreur sur le titre du formulaire upload***// 
function hideErrorTitle(){
  let error_title = document.getElementById("error_title")
      error_title.style.display="none"
}

// *** Affiche une erreur par rapport à l'image à envoyer ***// 
function showErrorFile(){
  let error_empty_image = document.getElementById("error_empty_image")
      error_empty_image.style.display="flex"
  let error_size_image = document.getElementById("error_size_image")
      error_size_image.style.display="none"
}

// *** Cache une erreur par rapport à l'image à envoyer ***// 
function hideErrorFile(){
  let error_empty_image = document.getElementById("error_empty_image")
      error_empty_image.style.display="none"
}

// *** Affiche une erreur par rapport à la taille de l'image à envoyer ***// 
function showErrorSizeImage(){
  let error_size_image = document.getElementById("error_size_image")
      error_size_image.style.display="flex"
  let error_empty_image = document.getElementById("error_empty_image")
      error_empty_image.style.display="none"
}

// *** Cache une erreur par rapport à la taille de l'image à envoyer ***// 
function hideErrorSizeImage(){
  let error_size_image = document.getElementById("error_size_image")
      error_size_image.style.display="none"
}

//// *** Change la couleur du bonton principal ***// 
function disabledSubmitBtn(){
  let btnSubmit = document.getElementById("mf_btn_valid")
      btnSubmit.disabled = true
      btnSubmit.classList.remove("activeButton")
}

function enableSubmitBtn(){
  let btnSubmit = document.getElementById("mf_btn_valid")
      btnSubmit.disabled = false
      btnSubmit.classList.add("activeButton")
}
