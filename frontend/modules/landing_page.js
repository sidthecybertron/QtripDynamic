import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let response = await fetch(config.backendEndpoint+"/cities");
  let data = await response.json();
  console.log(data);
  return data;
}
catch(err){
    return null;
  };
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let addCity = document.getElementById("data");
  let divTag = document.createElement("div");
  divTag.setAttribute("id",id);
  divTag.setAttribute("class","col-12 col-sm-6 col-lg-3 col-md-4 mb-4");
  let anchorTag = document.createElement("a");
  anchorTag.setAttribute("id",id);
  anchorTag.setAttribute("href",`pages/adventures/?city=${id}`);
  let divTag1 = document.createElement("div");
  divTag1.setAttribute("class","tile");
  let imgTag = document.createElement("img");
  imgTag.setAttribute("src",image);
  let divTag2 = document.createElement("div");
  divTag2.setAttribute("class","tile-text text-center text-light d-flex flex-column justify-content-end");
  let headingTag = document.createElement("h4");
  headingTag.innerText=city;
  let paraTag = document.createElement("p");
  paraTag.innerText=description;
  divTag2.append(headingTag);
  divTag2.append(paraTag);
  divTag1.append(imgTag);
  divTag1.append(divTag2);
  //divTag.append(divTag1);
  anchorTag.append(divTag1);
  divTag.append(anchorTag);
  addCity.append(divTag);
//   document.getElementById("data").innerHTML = `<div class="col-12 col-sm-6 col-lg-3 col-md-4"><a href="pages/adventures/?city=${id}">
//   <div class="tile">
//     <img src="${image}" alt="">
//     <div class="tile-text text-center text-light d-flex flex-column justify-content-end">
//       <h4>${city}</h4>
//       <p>${description}</p>
//     </div>
//   </div>
// </a>
// </div>`
  


}

export { init, fetchCities, addCityToDOM };
