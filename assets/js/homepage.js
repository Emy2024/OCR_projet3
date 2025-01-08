import { fetchDataAPI } from "./fetchPortfolio.js";

let URL_API = "http://localhost:5678/api/works" 
let DATA = await fetchDataAPI(URL_API) 

let URL_DATA_CATEGORIES = await fetchDataAPI("http://localhost:5678/api/categories") 
//console.log("Mes catégories récupérées : ", URL_DATA_CATEGORIES)

let BTN_LOGIN = document.querySelector(".btn_loginLogout")
let BTN_OPENMODALE = document.createElement("a")
let modaleButton = document.createElement("button")

let GALLERYCONTAINER_MODALE = document.getElementById("galleryContainer_modale")

function main(){
  if (localStorage.getItem("token")) {
    createAdminLogout(BTN_LOGIN)
    initAdminLogout(BTN_LOGIN)
    createAdminModeEdition()
    createAdminButtonOpenModale(BTN_OPENMODALE)
    initAdminButtonsModale(BTN_OPENMODALE)
  }
 else (console.log("error"))
} 
main()

function createAdminLogout(btn_name){
  btn_name.innerHTML = "logout"
  btn_name.classList.add("logout")
}

async function initAdminLogout(btn_name){
  btn_name.addEventListener("click", function(){
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

function createAdminButtonOpenModale(btn_name){
  let retriveId = document.getElementById("createButtonModifier")

  btn_name.href='index.html'
  btn_name.id = "a_modifier"
  btn_name.classList.add("modifier_btn")

  let modifier_icone = document.createElement("i")
  modifier_icone.classList.add("fa-regular", "fa-pen-to-square")

  retriveId.appendChild(btn_name)
  btn_name.appendChild(modifier_icone)
}

async function initAdminButtonsModale(btn_name){
  btn_name.addEventListener("click", function(event){
    event.preventDefault()
    createAdminModale("Galerie photo", displayGalleryModale(), "Ajouter une photo")
    createAdminOverlayModale()
  })
}

async function createAdminModale(titleModale, contentModale, contentButton){

  let modale = document.createElement('div');
  modale.classList.add("modale");
  modale.style.display = 'flex'; 

  let modaleTitle = document.createElement('p')
  modaleTitle.innerHTML = titleModale
  modaleTitle.classList.add("modaleTitle")
  
  let modaleMainContent = document.createElement('div')
  modaleMainContent.classList.add("modaleMainContent");
  modaleMainContent.innerHTML = contentModale // l'erreur vient elle d'ici ?
 
  let modaleLine = document.createElement("div")
  modaleLine.classList.add("modaleLine")

  modaleButton.classList.add("modaleButton")
  modaleButton.innerHTML = contentButton

  let modaleCloseButton = document.createElement("p")
  modaleCloseButton.innerHTML = "x"
  modaleCloseButton.classList.add("modaleCloseButton")
  modaleCloseButton.id = "modaleCloseButtonId"
/*   modaleCloseButton.addEventListener('click', () => {
    modale.style.display = 'none'; 
    modale_overlay.style.display = 'none'; 
  });  */
  
  let modalePreviousButton = document.createElement("i")
  modalePreviousButton.classList.add("fa-solid", "fa-arrow-left", "modalePreviousButton")

  document.body.appendChild(modale);

  modale.appendChild(modaleTitle)
  modale.appendChild(modaleMainContent)
  modale.appendChild(modaleLine)
  modale.appendChild(modaleButton)
  modale.appendChild(modaleCloseButton)
  modale.appendChild(modalePreviousButton)
}


function createAdminOverlayModale(){
  let modale_overlay = document.createElement('div');
  modale_overlay.classList.add('modale-overlay');
  document.body.appendChild(modale_overlay)
}

async function displayGalleryModale(){
  let galleryContainer_modale = document.createElement("div")
  galleryContainer_modale.classList.add("galleryContainer_modale")
   
  for(let i=0;i <DATA.length;i++){
    let containerImage = document.createElement("div")
    containerImage.classList.add("containerImage")    
    let image = document.createElement("img")
    image.src = DATA[i].imageUrl
    image.classList.add("image")    
    console.log(image)

    galleryContainer_modale.appendChild(containerImage)
    containerImage.appendChild(image)
  }
}







