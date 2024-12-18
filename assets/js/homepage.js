sessionStorage.getItem("token")


// Pen to square : <i class="fa-regular fa-pen-to-square" style="color: #000000;"></i>

function createElement(){
  let containerElement = document.createElement("div")
  let textElement = document.createElement("p")
 
  textElement.innerHTML="Mode édition"
  textElement.classList.add("modeEdition")

  containerElement.appendChild(containerEditionMode)
  containerEditionMode.classList.add("containerEditionMode")
  
  const elementId = document.querySelector(".addFile")
  const elementSpan = document.createElement("span")
  const elementA = document.createElement("a")
  let textSpan = "modifier"


  elementSpan.innerHTML = textSpan
  elementSpan.classList.add("modifier")
  elementId.appendChild(elementSpan)

  
}
createElement()

