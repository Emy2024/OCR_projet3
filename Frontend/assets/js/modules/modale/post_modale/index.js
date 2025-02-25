//** Modale de confirmation : image bien ajoutée **/
export function showConfirmModale(){
    displayOverlay()
    displayConfirmModale()
    buttonClose()
}

//** Affiche l'overlay **/
function displayOverlay(){
    let modalePictureAdded_overlay = document.getElementById("modalePictureAdded_overlay")
        modalePictureAdded_overlay.style.display="block"
}

//** Affiche la modale de confirmation d'ajout d'une image **/
function displayConfirmModale(){
    let modalePictureAdded_wrapper = document.getElementById("modalePictureAdded_wrapper")
        modalePictureAdded_wrapper.style.display="block"
}

//** Affiche le bouton fermé et évènement associé **/
function buttonClose(){
    let modalePictureAdded_overlay = document.getElementById("modalePictureAdded_overlay")
    let modalePictureAdded_wrapper = document.getElementById("modalePictureAdded_wrapper")
    let modalePictureAdded_wrapper_closeBtn = document.getElementById("modalePictureAdded_wrapper_closeBtn")
        modalePictureAdded_wrapper_closeBtn.addEventListener("click", function(){
            modalePictureAdded_overlay.style.display="none"
            modalePictureAdded_wrapper.style.display="none"
        })
}