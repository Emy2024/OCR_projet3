import * as DeleteModale from "../delete_modale/index.js"
import { WORKS } from "../../../index.js"

// ***Création de la galerie photos **// 
export function createGalleryModale(){
  let galleryContainer_modale = document.getElementById("mg_container")
      galleryContainer_modale.innerHTML =""
      for(let i=0;i <WORKS.length;i++){    
        createThumbnail(galleryContainer_modale, WORKS[i])
      }
}
// ***Création des éléments de la galerie  **// 
function createThumbnail(container, work) {  
  let containerImageModale = document.createElement("div")
      containerImageModale.classList.add("containerImageModale") 
      containerImageModale.id = "containerImageModale_"+work.id  

  let trashElementModale = document.createElement("a")
      trashElementModale.classList.add("trashElementModale") 
  
  let imageModale = document.createElement("img")
      imageModale.src = work.imageUrl
      imageModale.id = work.id  
      imageModale.classList.add("imageModale")  
  
  let trashIconModale = document.createElement("i")
      trashIconModale.classList.add("fa-solid", "fa-trash", "trashIconModale") 
      trashIconModale.dataset.id = imageModale.id   

  trashIconModale.addEventListener("click", function(event){
    DeleteModale.showModaleDelete()
    let containerImageModale = event.target.closest('.containerImageModale')
    let trashId = event.target.dataset.id 
    DeleteModale.initEventButtonNo()
    DeleteModale.initEventButtonYes(trashId, containerImageModale) 
  }) 

  container.appendChild(containerImageModale)
  containerImageModale.appendChild(imageModale)
  containerImageModale.appendChild(trashElementModale)
  trashElementModale.appendChild(trashIconModale)
}

