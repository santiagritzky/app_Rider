// Select the HTML element with the id "rideList"
const rideListElement = document.querySelector("#rideList");

// Get all the rides
const allRides = getAllRides();

// Loop through each ride asynchronously
allRides.forEach(async ([id, value]) => {
  // Parse the ride data from JSON to an object
  const ride = JSON.parse(value);
  ride.id = id;

  // Create a new list item element for the ride
  const itemElement = document.createElement("li");
  itemElement.id = ride.id;

  // Set the class name and styles for the list item element
  itemElement.className = "d-flex p-1 align-items-center shadow-sm gap-1";
  const mapId = `map${ride.id}`;
  const mapElement = document.createElement("div");
  mapElement.id = mapId;
  mapElement.style = "width:100px;height:100px";
  mapElement.classList.add("bg-secondary");
  mapElement.classList.add("rounded-4");

  // Create a new div element to hold the ride data
  const dataElement = document.createElement("div");
  dataElement.className = "flex-fill d-flex flex-column";
  
  // Append the list item element to the ride list
  rideListElement.appendChild(itemElement);

  // Add a click event listener to the list item element
  itemElement.addEventListener("click", () => {
    window.location.href = `./details.html?id=${ride.id}`;
  });

  // Get the first position of the ride data and fetch its location data
  const firstPosition = ride.data[0];
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  // Create a div element for the city information
  const cityDiv = document.createElement("div");
  cityDiv.className = "text-primary mb-2";
  cityDiv.innerText = `City: ${firstLocationData.city} -  ${firstLocationData.countryCode}`;

  // Create a div element for the maximum speed
  const maxSpeedDiv = document.createElement("div");
  maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} K/hm`;
  maxSpeedDiv.classList = "h5";

  // Create a div element for the distance
  const distanceDiv = document.createElement("div");
  distanceDiv.innerText = `Distance: ${getDistance(ride.data)}`;

  // Create a div element for the duration time
  const durationDiv = document.createElement("div");
  durationDiv.innerText = `Duration time: ${getduration(ride)}`;

  // Create a div element for the start time
  const dateDiv = document.createElement("div");
  dateDiv.innerText = `Start time: ${getStartDate(ride)}`;
  dateDiv.classList = "text-secondary mt-2";

  // Append the div elements to the data element
  dataElement.appendChild(cityDiv);
  dataElement.appendChild(maxSpeedDiv);
  dataElement.appendChild(distanceDiv);
  dataElement.appendChild(durationDiv);
  dataElement.appendChild(dateDiv);

  // Append the map element and data element to the list item element
  itemElement.appendChild(mapElement);
  itemElement.appendChild(dataElement);

  // Create a Leaflet map and set its view to the first position of the ride data
  const map = L.map(mapId, {
    zoomControl: false,
    dragging: false,
    attributionControl: false,
    scrollWheelZoom: false
  });
  map.setView([firstPosition.latitude, firstPosition.longitude], 16);

  // Add a tile layer to the map using OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    minZoom: 15,
    maxZoom: 20,
  }).addTo(map);

  // Add a marker to the map at the first position of the ride data
  L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map);
});
