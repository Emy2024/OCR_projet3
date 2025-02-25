import * as Fetch from "./fetch.js"
const URL='http://localhost:5678/api/works'

// *** Fetch pour MAJ galerie ***// 
export function postData(payload) {
    return Fetch.postData(URL,payload)
}