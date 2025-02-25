// *** Centralisation des fonctionnalités en mode admin***/ 

import * as login_logout from "./login_logout.js"
import * as bandeau from "./bandeau_admin.js"
import * as btnOpenModale from "./btn_open_modale.js"
import * as filter from "../portfolio/index.js"

export function checkAdmin(){
  login_logout.check()
  if (localStorage.getItem("token")) {
    bandeau.create()
    btnOpenModale.create()
    filter.hideFilterContainer()
  } else {
    console.log("error")
  }
}
