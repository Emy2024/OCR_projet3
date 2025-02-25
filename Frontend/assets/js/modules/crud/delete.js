// *** Suppression des travaux présents dans l'API ***/ 
export async function deleteData(id) { 
    fetch (`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
       headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('token'),
      } 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP :  ${response.status}`)
      }
    })
    .catch(error => {
      console.log(error)
    }) 
  }
  