import * as DisplayGallery from "./displayGallery.js"
import * as ModaleDisplay from "./displayModale.js"
import * as EditModale from "../edit_modale/index.js"

export async function initEventsMainModale(){

  // *********** Ouverture main modale **********// 
  let modale_open_button = document.getElementById('modale_open_button')
      modale_open_button.addEventListener("click", function(event){
        event.preventDefault()
        ModaleDisplay.toggleShowModaleAndOverlayMG(true)
        DisplayGallery.createGalleryModale()
      }) 

  // ******************* Fermeture modale au clic sur l'overlay mg *******************// 
  let modale_overlay_mg = document.getElementById("modale_overlay_mg")
      modale_overlay_mg.addEventListener("click", function(){
        ModaleDisplay.toggleShowModaleAndOverlayMG(false)
        ModaleDisplay.toggleShowModaleAndOverlayMF(false)
      })

  // ******************* Fermeture modale au clic sur la croix *******************// 
  document.querySelectorAll('.modale_close_button').forEach(button => {
    button.addEventListener('click', () => {
      ModaleDisplay.toggleShowModaleAndOverlayMG(false)
      ModaleDisplay.toggleShowModaleAndOverlayMF(false)
      EditModale.reinitializeForm() 
    })
  })

  // ******************* Passage modale suivante *******************// 
  let modaleMainButton = document.getElementById("mg_btn_valid")
      modaleMainButton.addEventListener("click", function(){
        ModaleDisplay.toggleShowModaleAndOverlayMG(false)
        ModaleDisplay.toggleShowModaleAndOverlayMF(true)
      })     
} 

