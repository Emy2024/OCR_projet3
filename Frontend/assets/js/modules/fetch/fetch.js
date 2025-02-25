// *** Fetch pour l'ajout de la photo  ***// 
export async function postData(url, payload) {
    try {
      const response = await fetch(url, {
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
      console.log("fetch succès :", data);
      return data; // Retourne la réponse
  
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'image :", error);
      throw error; 
    }
  }

// *** Fetch pour connexion login ***// 
export async function postPublicData(url, payload) {
    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            },
        body: payload
        });

        if(response.ok) {
        const data = await response.json()
        console.log("fetch succès :", data)
        return data // Retourne la réponse
        }   
        console.log("fetch ko", response)
        return false

    } catch (error) {
        console.error("Erreur générale du fetch :", error);
        return false
    }
}
  