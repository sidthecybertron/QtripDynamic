import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL


  // Place holder for functionality to work in the Stubs
  console.log("search",search);
  const urlParams = new URLSearchParams(search);
  const param = urlParams.get('adventure');
  return param;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let response = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    let data = await response.json();
    console.log(data);
    return data;
  }
  catch(err){
    return null;
  };


  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log("Adventures",adventure);
    let headingTag = document.getElementById("adventure-name");
    headingTag.innerHTML=adventure.name;
    let paraTag = document.getElementById("adventure-subtitle");
    paraTag.innerHTML=adventure.subtitle;
  for(let i=0;i<adventure.images.length;i++){
    
    let divImg = document.getElementById("photo-gallery");
    let img = document.createElement("img");
    img.setAttribute("class","activity-card-image")
    img.setAttribute("src",adventure.images[i]);
    divImg.append(img);
  }
  let divContent = document.getElementById("adventure-content");
  divContent.innerHTML=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let divImg = document.getElementById("photo-gallery");
  let carosalIndicator = '';
  let carosalInner = '';
  for(let i=0;i<images.length;i++){
    carosalIndicator+=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ${i===0 ? `class="active" aria-current="true" `:"" } aria-label="Slide+ ${(i+1)}+"}></button>`;
    carosalInner+=`<div class="carousel-item ${i == 0? 'active':''}">
    <img src="${images[i]}" class="d-block activity-card-image" alt="...">
    </div>`
    
     
  }
  divImg.innerHTML= `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
    ${carosalIndicator};
    </div>
    <div class="carousel-inner">
    ${carosalInner}; 
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log("Reservation sold out", adventure);
  let divSold = document.getElementById("reservation-panel-sold-out");
  let divReserve = document.getElementById("reservation-panel-available");
  let costPerHeadd = document.getElementById("reservation-person-cost");
  if(adventure.available){
    divSold.setAttribute("style","display:none");
    divReserve.setAttribute("style","display:block");
    costPerHeadd.innerHTML=adventure.costPerHead;
  }
  else{
    divSold.setAttribute("style","display:block");
    divReserve.setAttribute("style","display:none");
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cos`t field
  console.log("Person",persons);
  let divReservationCost = document.getElementById("reservation-cost");
  divReservationCost.innerHTML=(adventure.costPerHead)*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm_1 = document.getElementById("myForm");
  myForm_1.addEventListener('submit',function(e){
    e.preventDefault();
    const payload = new FormData(myForm_1);
    let fName = payload.get("name");
    let fDate = payload.get("date");
    let fPerson = payload.get("person");
    console.log("Name",fName);
    let data = {
      name:fName,
      date:fDate,
      person:fPerson,
      adventure:adventure.id,
      };
    const formPost = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(config.backendEndpoint+'/reservations/new', formPost)
    .then(data => {
      if (!data.ok) {
        window.alert("Failure");
        throw Error(data.status);
       }
      else{
        window.alert("Success");
        location.reload();
      }
       return data.json();
      }).then(update => {
      console.log(update);
      }).catch(e => {
      console.log(e);
      });
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservationBanner = document.getElementById("reserved-banner");
  if(adventure.reserved){
    reservationBanner.setAttribute("style","display:block");
  }
  else{
    reservationBanner.setAttribute("style","display:none");
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
