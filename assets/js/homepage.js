import { fetchDataAPI } from "./fetchPortfolio.js";

let URL_API = "http://localhost:5678/api/works" 
let DATA = await fetchDataAPI(URL_API) 

let URL_DATA_CATEGORIES = await fetchDataAPI("http://localhost:5678/api/categories") 
//console.log("Mes catégories récupérées : ", URL_DATA_CATEGORIES)

let BTN_LOGIN = document.querySelector(".btn_loginLogout")
let BTN_OPENMODALE = document.createElement("a")

let GALLERYCONTAINER_MODALE = document.getElementById("galleryContainer_modale")

function main(){
  if (localStorage.getItem("token")) {
    createAdminLogout()
    initAdminLogout()
    createAdminModeEdition()
    createAdminButtonOpenModale(BTN_OPENMODALE)
    initCloseModale(modaleCloseButton)
    //initCloseModale(modale_overlay)
    initAdminButtonOpenModale()
    initAdminButtonNextModale()
  }
 else (console.log("error"))
} 
main()

function createAdminLogout(){
  BTN_LOGIN.innerHTML = "logout"
  BTN_LOGIN.classList.add("logout")
}

async function initAdminLogout(){
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

function initAdminButtonOpenModale(){
  BTN_OPENMODALE.addEventListener("click", function(event){
    event.preventDefault()
    handleAdminButtonOpenModale()
  })
}

function handleAdminButtonOpenModale(){
  createAdminOverlayModale()
  createModale()
  createAdminModaleDynamicContent("Galerie photo", "Ajouter une photo")
  displayGalleryModale()
}

function createAdminOverlayModale(){
  let modale_overlay = document.getElementById("modale_overlay")
  modale_overlay.classList.add("modale_overlay_active") 
}

function createModale(){
  let modale = document.getElementById("modale")
  modale.classList.add("modale")
  modale.classList.remove("modale_inactive")
}

function createAdminModaleDynamicContent(titleModale, contentButton){
  let modaleTitle = document.getElementById("modaleTitle")
  modaleTitle.classList.add("modaleTitle")
  modaleTitle.innerHTML = titleModale

  let modaleMainContent = document.getElementById("modaleMainContent")
  modaleMainContent.classList.add("modaleMainContent")
  modaleMainContent.innerHTML = ""
  
  let modaleLine = document.getElementById("modaleLine")
  modaleLine.classList.add("modaleLine")
  
  let modaleButton = document.getElementById("modaleButton")
  modaleButton.classList.add("modaleButton")
  modaleButton.innerHTML = contentButton

  let modaleCloseButton = document.getElementById("modaleCloseButton")
  modaleCloseButton.innerHTML = "x"
  modaleCloseButton.classList.add("modaleCloseButton")
}

function initCloseModale(trigger){
  trigger.addEventListener("click", function(){
    let modale = document.getElementById("modale")
    modale.classList.remove("modale")
    modale.classList.add("modale_inactive")
    
    let modale_overlay = document.getElementById("modale_overlay")
    modale_overlay.classList.remove("modale_overlay_active") 
  })
}

async function displayGalleryModale(){

  let modaleMainContent = document.getElementById("modaleMainContent")

  let galleryContainer_modale = document.createElement("div")
  galleryContainer_modale.classList.add("galleryContainer_modale")

  for(let i=0;i <DATA.length;i++){
    let containerImage = document.createElement("div")
    containerImage.classList.add("containerImage") 
    let trashElement = document.createElement("a")
    let trashIcon = document.createElement("i")
  
    let image = document.createElement("img")
    image.src = DATA[i].imageUrl
    let imageId = DATA[i].id
    image.classList.add("galleryContainer_modale_image")    
    //console.log(image)
    trashElement.classList.add("trashElement") 
    trashIcon.classList.add("fa-solid", "fa-trash", "trashIcon") 
    trashIcon.dataset.id = image.id // pour chaque icon, met un id et associe-le à un id de l'image
    //console.log(trashIcon)

    modaleMainContent.appendChild(galleryContainer_modale)
    galleryContainer_modale.appendChild(containerImage)
    containerImage.appendChild(image)
    containerImage.appendChild(trashElement)
    trashElement.appendChild(trashIcon)
  }
}



/* trashElement.addEventListener("click", function(){
  fetch(`http://localhost:5678/api/works${imageId}`, {
      method: 'DELETE',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Erreur lors de la suppression de l'image : ${response.statusText}`);
      }

      image.remove();
      console.log(`Photo ${imageId} supprimée avec succès.`);
  })
  .catch(error => {
      console.error('Une erreur s\'est produite:', error);
  });

})
 */


function initAdminButtonNextModale(){
  let modaleButton = document.getElementById("modaleButton")
  modaleButton.addEventListener("click", function(event){
  event.preventDefault()
 
  handleAdminButtonNextModale()
})
}

function handleAdminButtonNextModale(){
  createAdminOverlayModale()
  createModale()
  createAdminModaleDynamicContent("Ajout photo", "Valider")
  displayAddPictureAndForm()
}

function displayAddPictureAndForm(){
  displayUploadPicture()
  displayUploadForm()
}

function displayUploadPicture(){
  let modaleMainContent = document.getElementById("modaleMainContent")
  
  let modaleUpload = document.createElement("div")
  modaleUpload.classList.add("modaleUpload") 

  let modaleUpload_icon = document.createElement("i")
  modaleUpload_icon.classList.add("fa-regular", "fa-image", "modaleUpload_icon") 
  
  let modaleUpload_btn = document.createElement("button")
  modaleUpload_btn.innerHTML = "+ Ajouter photo"
  modaleUpload_btn.classList.add("modaleUpload_btn")

  let modaleUpload_paragraph = document.createElement("p")
  modaleUpload_paragraph.innerHTML = "jpg, png : 4mo max"
  modaleUpload_paragraph.classList.add("modaleUpload_paragraph") 

  modaleMainContent.appendChild(modaleUpload)
  modaleUpload.appendChild(modaleUpload_icon)
  modaleUpload.appendChild(modaleUpload_btn)
  modaleUpload.appendChild(modaleUpload_paragraph)
}

function displayUploadForm(){
  let modaleMainContent = document.getElementById("modaleMainContent")
  let modaleForm = document.createElement("form")
  modaleForm.classList.add("modaleForm")

  let updateContentForm_label_1 = document.createElement("label")
  updateContentForm_label_1.innerHTML= "Titre"

  let updateContentForm_input = document.createElement("input")

  let updateContentForm_label_2 = document.createElement("label")
  updateContentForm_label_2.innerHTML= "Catégorie"

  let updateContentForm_select = document.createElement("select")
  
  let categories_uniques = []

  updateContentForm_select.addEventListener("click", function(){  
  categories_uniques.innerHTML = ""
    
    for (let i =0; i < URL_DATA_CATEGORIES.length;i++){
      categories_uniques = URL_DATA_CATEGORIES[i].name
      let updateContentForm_select_option = document.createElement("option"); 

      updateContentForm_select_option.value = categories_uniques
      updateContentForm_select_option.textContent = categories_uniques
      updateContentForm_select.appendChild(updateContentForm_select_option)
    }
  })
  modaleMainContent.appendChild(modaleForm)
  modaleForm.appendChild(updateContentForm_label_1)
  modaleForm.appendChild(updateContentForm_input)

  modaleForm.appendChild(updateContentForm_label_2)
  modaleForm.appendChild(updateContentForm_select)
}

function initCategory(){

}

function displayUploadFormErrorHandling(){

}

