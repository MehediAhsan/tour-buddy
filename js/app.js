var carObject = {
  vehicle: "Car",
  imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  farePerKilo: 3,
  capacity: 4,
  description: "You Have More Flexibility And Freedom. When you travel by car, you are on your schedule and have complete control over your trip.",
};
var busObject = {
  vehicle: "Bus",
  imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  farePerKilo: 3,
  capacity: 30,
  description: "In the long boring bus journey sleeping on friends shoulder, Sharing earphones then fighting over which song has to play next",
};
var bikeObject = {
  vehicle: "Bike",
  imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmlrZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
  farePerKilo: 3,
  capacity: 30,
  description: "In the long boring bus journey sleeping on friends shoulder, Sharing earphones then fighting over which song has to play next",
};
var trainObject = {
  vehicle: "Train",
  imageUrl: "https://images.unsplash.com/photo-1563632158089-0ccec4fb87cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  farePerKilo: 3,
  capacity: 60,
  description: "In the long boring bus journey sleeping on friends shoulder, Sharing earphones then fighting over which song has to play next",
};
var boatObject = {
  vehicle: "Boat",
  imageUrl: "https://images.unsplash.com/photo-1569263918239-56a390b8360e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80",
  farePerKilo: 3,
  capacity: 70,
  description: "In the long boring bus journey sleeping on friends shoulder, Sharing earphones then fighting over which song has to play next",
};

const servicesArray = [carObject, bikeObject, busObject, trainObject, boatObject];

function displayServices(service) {
  const mainSection = document.getElementById("main-section");
  const stringifiedObj = JSON.stringify(service);
  const div = document.createElement("div");

  div.innerHTML = `
     <div class="card mt-3  mx-auto" style="max-width: 800px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src=${service.imageUrl} class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Transport Mood : ${service.vehicle}</h5>
                <p class="card-text">${service.description}</p>
                <p class="card-text"><small class="text-muted">Fare per kilo : $${service.farePerKilo}</small> <small class="text-muted">Capacity : ${service.capacity}</small></p>
                <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick='handleBooking(${stringifiedObj})' data-bs-target="#exampleModal">
                Book Now
          </button>
              </div>
            </div>
          </div>
  </div>
  `;
  mainSection.appendChild(div);
}

function displayAllArticles(arr) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    displayServices(element);
  }
}

displayAllArticles(servicesArray);

function handleBooking(obj) {
  const modalBody = document.getElementById("modal-body");
  const stringifiedObj = JSON.stringify(obj);

  modalBody.innerHTML = ` 
    <div class="card mx-auto w-100" style="width: 18rem;">
    <img src=${obj.imageUrl} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Vehicle Mood : ${obj.vehicle}</h5>
      <p class="card-text">${obj.description}</p>
      <p class="card-text"><small class="text-muted">Fare per kilo : $${obj.farePerKilo}</small> <small class="text-muted">Capacity : ${obj.capacity}</small></p>
      <div class="d-flex flex-column" role="search">
       <p>Fare: <small class="text-muted" id="fare">$00</small > </p>
       <p>Tax: <small class="text-muted" id="tax">$00</small > </p>
       <p>Total-cost: <small class="text-muted" id="total-cost">$00</small > </p>

      <h5>Travel Distance :</h5><input class="form-control m-2 w-50" id= "distance-input"  type="number" placeholder="Distance to travel" aria-label="Search"/>
      <h5>Vehicle Quantity :</h5><input class="form-control m-2 w-50" type="number" id= "quantity-input" placeholder="How many vehicle" aria-label="Search"/>

      <button class="btn btn-success w-25 ms-2" aria-label="" type="submit" onclick='calculateCost(${stringifiedObj})'>Submit</button>
    </div>
    </div>
    </div>   
    `;
}

function calculateCost(obj) {
  const quantity = document.getElementById("quantity-input").value;
  const distance = document.getElementById("distance-input").value;

  if (quantity > 0 && distance > 0) {
    const fareDiv = document.getElementById("fare");
    const fare = quantity * distance * obj.farePerKilo;
    fareDiv.innerText = '$' + fare;

    const taxDiv = document.getElementById("tax");
    const tax = (fare * 0.1).toFixed(2);
    taxDiv.innerText = '$' + tax;

    const totalCostDiv = document.getElementById("total-cost");
    const totalCost = fare + tax;
    totalCostDiv.innerText = '$' + totalCost;
  } else {
    alert('Enter positive number');
    return;
  }
}


document.getElementById("search-btn").addEventListener("click", function () {
  const value = document.getElementById("search-value").value;
  for (let i = 0; i < servicesArray.length; i++) {
    const element = servicesArray[i];
    if (value.toLowerCase() ==
      element.vehicle.toLowerCase()) {
      document.getElementById("main-section").innerHTML = ""
      displayServices(element)
      return;
    }
  }
  alert("Nothing Found");
});