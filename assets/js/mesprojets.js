async function retreiveDataMyProjects(){
  const response = await fetch("http://localhost:5678/api/works")
  const tableauProjets = await response.json()
  //console.log(tableauProjets)


  //************************* Mes variables et boutons pour les filtres *********************//

  // Var boutons catégories
  var mainContainerFilterHTML
  var buttontoutesLesCategories
  var buttonCategorieObjets
  var buttonCategorieAppartements
  var buttonCategorieHotelsEtRestaurants

  mainContainerFilterHTML = document.querySelector(".filter") 
  buttontoutesLesCategories = document.createElement("button") 
  buttonCategorieObjets = document.createElement("button")
  buttonCategorieAppartements = document.createElement("button")
  buttonCategorieHotelsEtRestaurants = document.createElement("button")


  //***************************************** Ma boucle ***********************************//

  for (var i=0;i<tableauProjets.length;i++){
   //console.log(tableauProjets[i].category.name)


  //********************************* Mes filtres *******************************//

  buttontoutesLesCategories.innerText = "Tous les objets"

  if(tableauProjets[i].category.name === "Objets"){
    buttonCategorieObjets.innerText = tableauProjets[i].category.name
  } 
  else if (tableauProjets[i].category.name === "Appartements"){
    buttonCategorieAppartements.innerText = tableauProjets[i].category.name
  }
  else if (tableauProjets[i].category.name === "Hotels & restaurants"){
    buttonCategorieHotelsEtRestaurants.innerText = tableauProjets[i].category.name
  }

  mainContainerFilterHTML.appendChild(buttontoutesLesCategories)
  mainContainerFilterHTML.appendChild(buttonCategorieObjets)
  mainContainerFilterHTML.appendChild(buttonCategorieAppartements)
  mainContainerFilterHTML.appendChild(buttonCategorieHotelsEtRestaurants)



  //********************************* Ma gallerie dynamique *******************************//
  


  //****************************** Tout voir ****************************//

  const mainContainerGalleryHTML = document.querySelector(".gallery")

  const imageHTML = document.createElement("img")
  imageHTML.src = tableauProjets[i].imageUrl

  const containerfigureHTML = document.createElement("figure")
  
  const figureCaptionHTML = document.createElement("figcaption")
  figureCaptionHTML.innerHTML = tableauProjets[i].title 

  mainContainerGalleryHTML.appendChild(containerfigureHTML)
  containerfigureHTML.appendChild(imageHTML)
  containerfigureHTML.appendChild(figureCaptionHTML) 



  //************************** Tout voir si je clique **********************//

  let tableau = tableauProjets
  //console.log(tableau)

  buttontoutesLesCategories.addEventListener("click", function(){
    const recupTout = tableau
    //console.log(recupTout)

    mainContainerGalleryHTML.innerHTML = ""

    recupTout.forEach(item => {
    const imageHTML = document.createElement("img")
    imageHTML.src = item.imageUrl

    const containerfigureHTML = document.createElement("figure")
    
    const figureCaptionHTML = document.createElement("figcaption")
    figureCaptionHTML.innerHTML = item.title 

    mainContainerGalleryHTML.appendChild(containerfigureHTML)
    containerfigureHTML.appendChild(imageHTML)
    containerfigureHTML.appendChild(figureCaptionHTML) 
  })
  
})

//************************** Voir les objets si je clique **********************//

  buttonCategorieObjets.addEventListener("click", function(){
    const recupObjets = tableau.filter(item => item.category.name === "Objets")
    recupObjets.innerHTML = tableau
    //console.log(recupObjets)

    mainContainerGalleryHTML.innerHTML = ""

    recupObjets.forEach(item => {
      const imageHTML = document.createElement("img")
      imageHTML.src = item.imageUrl
  
      const containerfigureHTML = document.createElement("figure")
     
      const figureCaptionHTML = document.createElement("figcaption")
      figureCaptionHTML.innerHTML = item.title 
  
      mainContainerGalleryHTML.appendChild(containerfigureHTML)
      containerfigureHTML.appendChild(imageHTML)
      containerfigureHTML.appendChild(figureCaptionHTML) 
    
    })
  })

  //************************** Voir les appartements si je clique **********************//

  buttonCategorieAppartements.addEventListener("click", function(){
    const recupAppartements = tableau.filter(item => item.category.name === "Appartements")
    recupAppartements.innerHTML = tableau
    //console.log(recupAppartements)

    mainContainerGalleryHTML.innerHTML = ""

    recupAppartements.forEach(item => {
      const imageHTML = document.createElement("img")
      imageHTML.src = item.imageUrl
  
      const containerfigureHTML = document.createElement("figure")
     
      const figureCaptionHTML = document.createElement("figcaption")
      figureCaptionHTML.innerHTML = item.title 
  
      mainContainerGalleryHTML.appendChild(containerfigureHTML)
      containerfigureHTML.appendChild(imageHTML)
      containerfigureHTML.appendChild(figureCaptionHTML) 
    
    })
  })
  
//************************** Voir les hotels et restaurants si je clique **********************//

  buttonCategorieHotelsEtRestaurants.addEventListener("click", function(){
    const recupHotelsEtRestaurants = tableau.filter(item => item.category.name === "Hotels & restaurants")
    recupHotelsEtRestaurants.innerHTML = tableau
    //console.log(recupHotelsEtRestaurants)

    mainContainerGalleryHTML.innerHTML = ""

    recupHotelsEtRestaurants.forEach(item => {
      const imageHTML = document.createElement("img")
      imageHTML.src = item.imageUrl
  
      const containerfigureHTML = document.createElement("figure")
     
      const figureCaptionHTML = document.createElement("figcaption")
      figureCaptionHTML.innerHTML = item.title 
  
      mainContainerGalleryHTML.appendChild(containerfigureHTML)
      containerfigureHTML.appendChild(imageHTML)
      containerfigureHTML.appendChild(figureCaptionHTML) 
    
    })
  })
  
}}
retreiveDataMyProjects()