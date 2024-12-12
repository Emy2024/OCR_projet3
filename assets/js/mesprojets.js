let BTN_TOUSLESITEMS = document.createElement("button")
let BTN_OBJETS = document.createElement("button")
let BTN_APPARTEMENTS = document.createElement("button")
let BTN_HOTELS_RESTAURANTS = document.createElement("button")


async function fetchDataAPI() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const DATAAPI = await response.json();
    return DATAAPI; // Retourne les données pour qu'une autre fonction puisse les utiliser
  } 
  catch (error) {
    console.error("Erreur lors du fetch :", error.message);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}


async function displayGallery(data){ 
    let galleryParent  = document.querySelector(".gallery")
    galleryParent.innerHTML=""

    data.forEach(item => {
      let figureGallery = document.createElement("figure")
    
      let imgGallery = document.createElement("img")
      imgGallery.src = item.imageUrl
   
      let figureCaptionGallery = document.createElement("figure-caption")
      figureCaptionGallery.textContent = item.title

      galleryParent.appendChild(figureGallery)
      figureGallery.appendChild(imgGallery)
      figureGallery.appendChild(figureCaptionGallery)
    })
}  


async function displayFilter(){
  let data = await fetchDataAPI(); 

  let dataUniques = [... new Set(data.map(item => item.category.name))]
  const filtreObjet = dataUniques[0]
  const filtreAppartement = dataUniques[1]
  const filtreHotelEtRestaurant = dataUniques[2]
  //console.log(dataUniques[1])

  let filterElement = document.querySelector(".filter")

  BTN_TOUSLESITEMS.innerText="Tous"
  
  BTN_OBJETS.innerText= filtreObjet

  BTN_APPARTEMENTS.innerText=filtreAppartement
  
  BTN_HOTELS_RESTAURANTS.innerText=filtreHotelEtRestaurant

  filterElement.appendChild(BTN_TOUSLESITEMS)
  filterElement.appendChild(BTN_OBJETS)
  filterElement.appendChild(BTN_APPARTEMENTS)
  filterElement.appendChild(BTN_HOTELS_RESTAURANTS)
}
displayFilter()



async function initEvent(){
  let data = await fetchDataAPI(); 
  console.log(data)

  let dataObj = data.filter(obj => obj.category.name ==="Objets" )
  //console.log(dataObj)
  let dataApp = data.filter(app => app.category.name ==="Appartements" )
  //console.log(dataApp)
  let dataHotelRestau = data.filter(hotelRestau => hotelRestau.category.name ==="Hotels & restaurants" )
  //console.log(dataHotelRestau)

  displayGallery(data)

  BTN_TOUSLESITEMS.addEventListener("click", function() {
    displayGallery(data)
  })

  BTN_OBJETS.addEventListener("click", function() {
    displayGallery(dataObj)
  })

  BTN_APPARTEMENTS.addEventListener("click", function() {
    displayGallery(dataApp)
  })

  BTN_HOTELS_RESTAURANTS.addEventListener("click", function() {
    displayGallery(dataHotelRestau)
  })
}

initEvent()
