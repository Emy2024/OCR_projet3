// *** Créé et affiche l'icône Mode Edition***/ 
export function create(){
    let icon_modeEdition = document.createElement("i")
        icon_modeEdition.classList.add("fa-regular", "fa-pen-to-square")
    let sous_div_modeEdition = document.createElement("div") 
        sous_div_modeEdition.classList.add("sous_div_modeEdition")
    let id_modeEdition = document.querySelector("#divModeEdition")
        id_modeEdition.appendChild(sous_div_modeEdition)
    
    sous_div_modeEdition.appendChild(icon_modeEdition)
}

