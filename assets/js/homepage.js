function main(){
  if (sessionStorage.getItem("token")) {
    createElementModeEdition()
    createElementModifier() 
    modale()
  }
 else (console.log("error"))
}
main()

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

  let a_modifier = document.createElement("a")
  a_modifier.href='index.html'
  let i_modifier_icone = document.createElement("i")
 
  i_modifier_icone.classList.add("fa-regular", "fa-pen-to-square")
  a_modifier.classList.add("a_modifier")

  id_mesProjets.appendChild(a_modifier)
  a_modifier.appendChild(i_modifier_icone)

}


function modale(){
  let modal_location = document.getElementById("modal")
  let modal_backgroundOverlay = document.createElement("div")
  modal_backgroundOverlay.classList.add("modal_backgroundOverlay")
  let modal_GaleriePhoto = document.createElement("div")
  modal_GaleriePhoto.classList.add("modal_GaleriePhoto")
  let modal_GaleriePhotoSubContainer = document.createElement("div")
  modal_GaleriePhotoSubContainer.classList.add("modal_GaleriePhotoSubContainer")
  let modal_CloseModal = document.createElement("p")
  modal_CloseModal.innerHTML = "x"
  modal_CloseModal.classList.add("modal_CloseModal")
  let modal_Title = document.createElement("p")
  modal_Title.innerHTML = "Galerie photo"
  modal_Title.classList = "modal_Title"


/*   
  let modal_backgroundOverlay = document.createElement("div")
  modal_backgroundOverlay.classList.add("modal_backgroundOverlay") */


  modal_location.appendChild(modal_backgroundOverlay)
  modal_backgroundOverlay.appendChild(modal_GaleriePhoto)
  modal_GaleriePhoto.appendChild(modal_GaleriePhotoSubContainer)
  modal_GaleriePhotoSubContainer.appendChild(modal_CloseModal)
  modal_GaleriePhoto.appendChild(modal_Title)
  modal_GaleriePhotoSubContainer.appendChild(modal_Title)
}
