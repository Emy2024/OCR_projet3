import { WORKS } from "../../../index.js"
import * as DeleteManager from "../../crud/delete.js"

// *** Boutton no : cache la modale Delete  ***/ 
export function initEventButtonNo(){
    let btnNO = document.querySelector(".buttonNoDeleteAnswer")
        btnNO.addEventListener("click", function(){
            hideModaleDelete()
            hideConfirmationDelete()
        })

    let modale_delete_overlay = document.getElementById("modaleDelete_overlay")
        modale_delete_overlay.addEventListener("click", function(){
            hideConfirmationDelete()
        }) 
}

// *** Cache la modale Delete ***// 
function hideModaleDelete(){
    let modale_delete_overlay = document.getElementById("modaleDelete_overlay")
        modale_delete_overlay.style.display ="none"

    let modale_Div_Delete_Picture = document.getElementById("modaleDivDeletePicture")
        modale_Div_Delete_Picture.style.display = "none"  
        modale_Div_Delete_Picture.classList.remove="modaleDivDeletePicture"
}

// *** Affiche la modale Delete ***// 
export function showModaleDelete(){
    let modale_delete_overlay = document.getElementById("modaleDelete_overlay")
        modale_delete_overlay.style.display ="flex"

    let modale_Div_Delete_Picture = document.getElementById("modaleDivDeletePicture")
        modale_Div_Delete_Picture.style.display ="flex"
        modale_Div_Delete_Picture.classList.add="modaleDivDeletePicture"
}

// ***Bouton yes pour supprimer les travaux : envoi du delete au backend ***// 
export function initEventButtonYes(id, containerPictureModale){
    let btnYes = document.querySelector(".buttonYesDeleteAnswer")
        btnYes.addEventListener("click", function(){
            containerPictureModale.remove()
            deleteWork(id, containerPictureModale)
            showModaleDelete()
        }) 
}

// *** SUPPRESSION DES TRAVAUX ***// 
function deleteWork(id, containerPictureModale) {
    let modaleDivDeletePicture_awaiting_confirmation = document.querySelector(".modaleDivDeletePicture_awaiting_confirmation")
    let modaleDivDeletePicture_confirmation = document.getElementById("modaleDivDeletePicture_confirmation")

    DeleteManager.deleteData(id) 

   // *** 1. Suppression dans WORKS ***// 

    const index= WORKS.findIndex(item=> item.id == id)
    if(index !==-1) {
        WORKS.splice(index,1);
    }

    // *** 2. Suppression dans la gallery principale ***// 
    let mainFigure=document.getElementById("mainFigure");
    for(let i=0;i<mainFigure.children.length;i++) {
        if(mainFigure.children[i].id== ("mainFigure_"+id)) {
            mainFigure.removeChild(mainFigure.children[i])
            break;
        }
    }
    modaleDivDeletePicture_awaiting_confirmation.style.display="none"
    modaleDivDeletePicture_confirmation.style.display="flex"
    initCloseButtonDeleteModale()
}

// *** Bouton fermé de la modale : confirmation suppression ***// 
function initCloseButtonDeleteModale(){
    let modaleDivDeletePicture_awaiting_confirmation = document.querySelector(".modaleDivDeletePicture_awaiting_confirmation")
    let modaleDivDeletePicture_confirmation = document.querySelector(".modaleDivDeletePicture_confirmation")
    let btnClose = document.querySelector(".modale_close_button_confirmed")
        btnClose.addEventListener("click", function(){
            hideModaleDelete()
            modaleDivDeletePicture_awaiting_confirmation.style.display="flex"
            modaleDivDeletePicture_confirmation.style.display="none"
        })
}

// *** Cache la modale Delete ***// 
function hideConfirmationDelete(){
    let modaleDelete_overlay = document.getElementById("modaleDelete_overlay")
        modaleDelete_overlay.style.display="none"

    let modaleDivDeletePicture = document.getElementById("modaleDivDeletePicture")
        modaleDivDeletePicture.style.display="none"
}

