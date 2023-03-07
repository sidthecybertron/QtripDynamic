
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // const myKeysValues = window.location.search;
  // console.log(myKeysValues);
  console.log("From search " + search);
  const urlParams = new URLSearchParams(search);
  const param = urlParams.get('city');
  //console.log("123"+param)
  return param;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    //console.log(city);
    let response = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    let data = await response.json();
    console.log(data);
    return data;
  }
  catch(err){
      return null;
    };

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log("Ad",adventures);
  for(let i=0;i<adventures.length;i++){
  let parentDiv = document.getElementById("data");
  // let divTag = document.createElement("div");
  // //divTag.setAttribute("class","row mb-4 category-banner activity-card activity-card img");
  // divTag.setAttribute("class","row mb-4");
  let divTagN = document.createElement("div");
  divTagN.setAttribute("class","col-6 col-lg-3 mb-3")
  let anchorTag = document.createElement("a");
  anchorTag.setAttribute("id",adventures[i].id);
  anchorTag.setAttribute("href",`detail/?adventure=${adventures[i].id}`);
  let divTag1 = document.createElement("div");
  divTag1.setAttribute("class","activity-card mb-4 box-shadow");
  let divTagbanner = document.createElement("div");
  divTagbanner.setAttribute("class","category-banner");
  divTagbanner.innerText=adventures[i].category;
  let imgTag = document.createElement("img");
  imgTag.setAttribute("class","img-fluid");
  imgTag.setAttribute("src",adventures[i].image);
  let divTag2 = document.createElement("div");
  divTag2.setAttribute("class","adventure-detail-card w-100");
  let divTag3 = document.createElement("div");
  divTag3.setAttribute("class","card-text d-lg-flex flex-wrap justify-content-between");
  let headingTag = document.createElement("h5");
  headingTag.innerText=adventures[i].name;
  let paraTag = document.createElement("p");
  paraTag.innerText="₹"+adventures[i].costPerHead;
  let divTag33 = document.createElement("div");
  divTag33.setAttribute("class","card-text d-lg-flex flex-wrap justify-content-between");
  let headingTag2 = document.createElement("h5");
  headingTag2.innerText = "Duration";
  let paraTag2 = document.createElement("p");
  paraTag2.innerText = adventures[i].duration;
  divTag3.append(headingTag);
  divTag3.append(paraTag);
  divTag33.append(headingTag2);
  divTag33.append(paraTag2);
  divTag2.append(divTag3);
  divTag2.append(divTag33);
  divTag1.append(imgTag);
  divTag1.append(divTag2);
  divTag1.append(divTagbanner);
  anchorTag.append(divTag1);
  divTagN.append(anchorTag);
  //divTag.append(divTagN);
  parentDiv.append(divTagN);
  }



  // <div class="row mb-4">
  //       <div class="col-6 col-lg-3 mb-3">  
  //         <a href="./resort/index.html">
  //            <div class="adventure-card card mb-4 box-shadow">
  //               <img class="img-fluid" src="../../assets/adventures/resort.jpg">            
  //               <div class="card-body">                 
  //                  <div class="card-text d-lg-flex flex-wrap text-center justify-content-between align-items-center">
  //                     <h5>Resort</h5>
  //                     <p>₹1,200</p>
  //                  </div>
  //               </div> 
  //            </div> 
  //         </a>
  //      </div>
      

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newDurationArray = [];
  console.log("Low",low);
  console.log("High",high);
  // let durArr = list[i].duration.split("-");
  // let min = durArr[0];
  // let max = durArr[1];
  for(let i=0;i<list.length;i++){
    // let durArr = list[i].duration.split("-");
    // let min = durArr[0];
    // let max = durArr[1];
    if(list[i].duration>=low && list[i].duration<=high){
      newDurationArray.push(list[i]);
      console.log(list[i]);
    }
  }
  return newDurationArray;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  console.log("filter",categoryList);
  let newCategoryArray = [];
  for(let i=0;i<list.length;i++){
    for(let j=0;j<categoryList.length;j++){
      if(list[i].category==categoryList[j]){
          console.log("sad");
          newCategoryArray.push(list[i]);
         
      }
    }
  }
  //console.log(newCategoryArray);
  return newCategoryArray;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods  
  // console.log(list);
  console.log("FF",filters);
  //console.log(filters.category);
  let durArray = filters.duration.split("-");
  let min = durArray[0];
  let max = durArray[1];
  if(filters.category.length!=0 && filters.duration!=""){
    list = filterByCategory(list,filters.category);
    list = filterByDuration(list,min,max);
  }
  else if(filters.duration!=""){
    list = filterByDuration(list,min,max);
  }
  else if(filters.category.length!=0){
    list = filterByCategory(list,filters.category);
  }
  else{
    return list;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  //let savedFilter = saveFiltersToLocalStorage(filters);
  window.localStorage.getItem('filters');




  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log("pills",filters);
  //let categorySection = document.getElementById("category-section");
  let categoryList = document.getElementById("category-list");
  for(let i=0;i<filters.category.length;i++){
    let categoryPills = document.createElement("div");
  categoryPills.setAttribute("class","category-filter");
  
  categoryPills.textContent = filters.category[i];
  categoryList.append(categoryPills);
  //categorySection.append(categoryPills);

  }
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
