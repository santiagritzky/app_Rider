// Create URLSearchParams object to parse the query parameters from the window's URL
const params = new URLSearchParams(window.location.search);

// Get the value of the "id" parameter from the query parameters
const rideId = params.get("id");

// Retrieve the ride record using the rideId
const ride = getRideRecord(rideId);

// Add an event listener to execute the code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {

  // Create a div element to display the ride data
  const dataElement = document.createElement("div");
  dataElement.className = "flex-fill d-flex flex-column";

  // Get the first position of the ride data
  const firstPosition = ride.data[0];

  // Retrieve the location data (city and country code) for the first position asynchronously
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  // Create a div element to display the city and country information
  const cityDiv = document.createElement("div");
  cityDiv.className = "text-primary mb-2";
  cityDiv.innerText = `City: ${firstLocationData.city} -  ${firstLocationData.countryCode}`;

  // Create a div element to display the maximum speed of the ride
  const maxSpeedDiv = document.createElement("div");
  maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} K/hm`;
  maxSpeedDiv.classList = "h5";

  // Create a div element to display the distance of the ride
  const distanceDiv = document.createElement("div");
  distanceDiv.innerText = `Distance: ${getDistance(ride.data)}`;

  // Create a div element to display the duration of the ride
  const durationDiv = document.createElement("div");
  durationDiv.innerText = `Duration time: ${getduration(ride)}`;

  // Create a div element to display the start time of the ride
  const dateDiv = document.createElement("div");
  dateDiv.innerText = `Start time: ${getStartDate(ride)}`;
  dateDiv.classList = "text-secondary mt-2";

  // Append all the created elements to the dataElement
  dataElement.appendChild(cityDiv);
  dataElement.appendChild(maxSpeedDiv);
  dataElement.appendChild(distanceDiv);
  dataElement.appendChild(durationDiv);
  dataElement.appendChild(dateDiv);

  // Append the dataElement to the element with id "data"
  document.querySelector("#data").appendChild(dataElement);

  // Add an event listener to the delete button to delete the ride and redirect to the homepage
  const deleteBtn = document.querySelector('#deleteBtn');
  deleteBtn.addEventListener('click', () => {
    deleteRide(rideId);
    window.location.href = "./";
  });

  // Create a Leaflet map with id "mapDetail"
  const map = L.map("mapDetail");

  // Set the view of the map to the coordinates of the first position of the ride
  map.setView([firstPosition.latitude, firstPosition.longitude], 16);

  // Add the OpenStreetMap tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    minZoom: 15,
    maxZoom: 20,
  }).addTo(map);

  // Create an array of positions from the ride data
  const positionArr = ride.data.map((position) => {
    return [position.latitude, position.longitude];
  });

  // Create a polyline using the position array and add it to the map
  const polyLine = L.polyline(positionArr, { color: "#F00" });
  polyLine.addTo(map);


//  Fit the map bounds to the polyline
  map.fitBounds(polyLine.getBounds());
});