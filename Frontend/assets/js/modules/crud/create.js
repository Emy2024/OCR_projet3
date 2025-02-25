// *** Post data pour ajouter une image (aperçu complet) ***/ 
export async function postData(payload) {
  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: payload
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    console.log("Image ajoutée avec succès :", data);
    return data; // Retourne la réponse

  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image :", error);
    throw error; 
  }
}
