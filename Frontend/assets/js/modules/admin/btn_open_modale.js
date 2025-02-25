// *** Créé et affiche le bouton d'ouverture de la modale ***/ 

export function create(){
    let modaleOpenButton = document.getElementById("modale_open_button")

    modaleOpenButton.classList.add("modale_open_button")

    let modifier_icone = document.createElement("i")
        modifier_icone.classList.add("fa-regular", "fa-pen-to-square")

    modaleOpenButton.appendChild(modifier_icone)
}

