import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let response = await fetch(config.backendEndpoint+'/reservations/');
    let data = await response.json();
    console.log(data);
    return data;
  }
  catch(err){
    return null;
  };


  // Place holder for functionality to work in the Stubs

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  console.log("Reservation",reservations);
  let reservationTable = document.getElementById("reservation-table-parent");
  let noReservationBanner = document.getElementById("no-reservation-banner");
  if(reservations.length!=0){
    noReservationBanner.setAttribute("style","display:none");
    reservationTable.setAttribute("style","display:block");
  }
  else{
    reservationTable.setAttribute("style","display:none");
    noReservationBanner.setAttribute("style","display:block");
  }
  let tableBody = document.getElementById("reservation-table");
 
  for(let i=0;i<reservations.length;i++){
    let trele = document.createElement("tr");
    const datefit = new Date(reservations[i].date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
  }) 
    const timefit = new Date(reservations[i].time).toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
  }).replace(" at", ",")
  console.log("Date",datefit);
  console.log("Time",timefit);
    trele.innerHTML=`<td><b>${reservations[i].id}</b></td>
    <td>${reservations[i].name}</td>
    <td>${reservations[i].adventureName}</td>
    <td>${reservations[i].person}</td>
    <td>${datefit}</td>
    <td>${reservations[i].price}</td>
    <td>${timefit}</td>
    <td id=${reservations[i].id}><a href="/pages/adventures/detail/?adventure=${reservations[i].adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>`

    tableBody.append(trele);
  }

  

  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
