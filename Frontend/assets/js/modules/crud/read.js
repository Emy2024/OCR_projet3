// *** Récupération des travaux présents dans l'API ***/ 
export async function loadDataWorks() {
  return await getPortfolioData("http://localhost:5678/api/works");
} 

// *** Récupération des catégories uniques pour le formulaire de la modale ***// 
export async function loadDataCategories() {
  return await getPortfolioData("http://localhost:5678/api/categories");
}

// *** Fetch ***//
async function getPortfolioData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } 
  catch (error) {
    console.error("Erreur lors du fetch :", error.message);
    return []; 
  }
}

