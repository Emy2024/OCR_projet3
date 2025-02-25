import * as Fetch from "./fetch.js"
const URL="http://localhost:5678/api/users/login"

// *** Fetch pour connexion login (charge utile) ***// 
export async function login(email, password) {
    try{
        let retrieveDataFromForm = 
        {
          email: email.trim(),
          password: password.trim()
        }
        let payload = JSON.stringify(retrieveDataFromForm)        
        return await Fetch.postPublicData(URL,payload)
    } catch(e) {
        console.log("userFetch > login ", e)
        return false
    }  
}

