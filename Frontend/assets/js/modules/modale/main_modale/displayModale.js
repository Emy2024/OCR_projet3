// ******************* Affiche / Cache la modale MG *******************// 
export function toggleShowModaleAndOverlayMG(show){
  if (show) {
    showOverlayAndModaleMG()
  } else{
    hideOverlayAndModaleMG()
  }
}   

// *** Modale MG ***// 
function showOverlayAndModaleMG(){
  let modale_overlay = document.getElementById("modale_overlay_mg")
      modale_overlay.style.display ="flex"
      modale_overlay.classList.add("modale_overlay")

  let modale_mg = document.getElementById("modale_mg")  
      modale_mg.style.display ="flex"
      modale_mg.classList.add("modale")
}   

// *** Modale MG ***// 
function hideOverlayAndModaleMG(){
  let modale_overlay = document.getElementById("modale_overlay_mg")
      modale_overlay.style.display ="none"
      modale_overlay.classList.remove("modale_overlay")

  let modale_mg = document.getElementById("modale_mg")  
      modale_mg.style.display ="none"
      modale_mg.classList.remove("modale")
}   

// ******************* Affiche / Cache la modale MF *******************// 
export function toggleShowModaleAndOverlayMF(show){
  if (show) {
    showOverlayAndModaleMF()
  } else{
    hideOverlayAndModaleMF()
  }
} 

// *** Modale MF ***// 
function showOverlayAndModaleMF(){
  let modale_overlay = document.getElementById("modale_overlay_mf")
      modale_overlay.style.display ="flex"
      modale_overlay.classList.add("modale_overlay")
  
  let modale_mf = document.getElementById("modale_mf") 
      modale_mf.style.display ="flex"
      modale_mf.classList.add("modale")
}   

// *** Modale MF ***// 
function hideOverlayAndModaleMF(){
  let modale_overlay = document.getElementById("modale_overlay_mf")
      modale_overlay.style.display ="none"
      modale_overlay.classList.remove("modale_overlay")

  let modale_mf = document.getElementById("modale_mf") 
      modale_mf.style.display ="none"
}   