import { readData } from "./modules/crud/index.js"
import * as PortfolioManager from "./modules/portfolio/index.js"
import * as AdminManager from "./modules/admin/index.js"
import * as MainModaleManager from "./modules/modale/main_modale/index.js"
import * as EditModale from "./modules/modale/edit_modale/index.js"

// Variables globales : tableaux vides
export let WORKS = []
export let CATEGORIES = []

// Récupère les données du backend
async function getDatasFromBackend() {
  WORKS = await readData.loadDataWorks()
  CATEGORIES = await readData.loadDataCategories()
  console.log(CATEGORIES)
}

// Point d'entrée
async function main(){
  try {
    await getDatasFromBackend()
    
    PortfolioManager.showGallery()
    
    AdminManager.checkAdmin()
    
    MainModaleManager.initEventsMainModale()

    EditModale.main()

  } catch(e) {
    console.log(e)
  }
} 
await main()

