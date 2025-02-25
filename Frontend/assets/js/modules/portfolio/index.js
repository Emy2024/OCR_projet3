import {WORKS, CATEGORIES} from "../../index.js"

// *** Point d'entrée ***//
export function showGallery(){
  createGallery(WORKS)
  createFilter(WORKS, CATEGORIES)
}

// *** Créé la gallerie photos ***//
export function createGallery(works) {
  const galleryParent  = document.querySelector(".gallery")
  galleryParent.innerHTML=""
  for (let i=0; i<works.length;i++){
    let figureGallery = document.createElement("figure")
        figureGallery.id = "mainFigure_"+works[i].id

    let imgGallery = document.createElement("img")
        imgGallery.src = works[i].imageUrl
  
    let figureCaptionGallery = document.createElement("figure-caption")
        figureCaptionGallery.classList.add("displayCaption_active")
        figureCaptionGallery.textContent = works[i].title

    galleryParent.appendChild(figureGallery)
    figureGallery.appendChild(imgGallery)
    figureGallery.appendChild(figureCaptionGallery)
  }
}

// *** Créé le container de filtre et des boutons associés ***//
function createFilter(works, categorys){
  let filterContainer = document.querySelector(".filter")

  let filter= document.createElement("button")
      filter.innerText="Tous"
      filter.classList.add("filter_btn", "filter_btn_active") 
  
      filter.addEventListener("click", function() {
        toogleClass("Tous")
        createGallery(works)
      })

  filterContainer.appendChild(filter)

  for(let i=0;i<categorys.length;i++) {
    filter= document.createElement("button")
    filter.innerText=categorys[i].name
    filter.classList.add("filter_btn", "filter_btn_inactive")

    filter.addEventListener("click", function() {
      toogleClass(categorys[i].name)
      applyFilter(works, categorys[i].name)
    })

    filterContainer.appendChild(filter)
  }
}

// *** Filtre du module Gallery ***//
function applyFilter(works, filterName){
  createGallery(works.filter(obj => obj.category.name ===filterName))
}

// *** Ajout/Suppression des classes en fonction du filtre sélectionné***//
function toogleClass(filterName) {
  let filters=document.getElementsByClassName("filter_btn")
  for(let i=0;i<filters.length;i++) {
    filters[i].innerText==filterName 
    ?
    filters[i].classList.replace("filter_btn_inactive", "filter_btn_active") 
    :
    filters[i].classList.replace("filter_btn_active", "filter_btn_inactive") 
  }
}

// *** Cache la partie filtre (quand mode admin activé) ***//
export function hideFilterContainer(){
  let filterContainer = document.querySelector(".filter")
      filterContainer.innerHTML=""
}

