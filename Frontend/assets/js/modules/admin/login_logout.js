// *** Initialisation du bouton logout***/ 
function initEventsLogout(){
    let logout = document.getElementById("logout")
        logout.addEventListener("click", function(){
            localStorage.removeItem("token")
            window.open("index.html","_self")
        })
}

// *** Vérification de la présence ou non du token***/ 
export function check() {
    if (localStorage.getItem("token")) {
        displayAdminLogout()
        initEventsLogout()
    }else {
        displayAdminLogin()
    }
}

// *** Affiche logout ***/ 
function displayAdminLogout(){
    let logout = document.getElementById("logout")
        logout.style.display="flex"
    
    let login = document.getElementById("login")
        login.style.display="none"
}

// *** Affiche login ***/ 
function displayAdminLogin(){
    let logout = document.getElementById("logout")
        logout.style.display="none"
    
    let login = document.getElementById("login")
        login.style.display="flex"
}
