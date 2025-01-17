let API_URL_WORKS = "http://localhost:5678/api/works" 
let API_URL_CATEGORIES = "http://localhost:5678/api/categories" 


export async function fetchDataAPI() {
  try {
    const response = await fetch(API_URL_WORKS);
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




// Fetch les catégories uniques pour la modale, partie upload > form

export async function fetchCategoryAPI() {
  try {
    const response = await fetch(API_URL_CATEGORIES);
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






// Fetch delete pour supprimer les images présentes dans l'API, partie createGalleryModale()
export async function fetchDelete(id, imgElement) {
  fetch (`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
     headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
    } 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP :  ${response.status}`)
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    imgElement.remove() 
    console.log(`L'image numéro ${id} a été supprimée`)
  })
  .catch(error => {
    console.log(`L'image numéro ${id} n'a pas été supprimée`, error)
  }) 
}