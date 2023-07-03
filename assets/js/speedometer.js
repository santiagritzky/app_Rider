// Get the speed element from the DOM
const speed = document.querySelector("#speed");

// Get the start and stop buttons from the DOM
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");

// Initialize variables to keep track of the watch ID and current ride
let watchId = null;
let currentRide = null;

// Add click event listener to the start button
startBtn.addEventListener("click", () => {
// If watchId is already set, return (avoid duplicate start)
if (watchId) {
return;
}

// Success callback function for geolocation
function handleSuccess(position) {
// Add the current position to the current ride
addPosition(currentRide, position);
// Display the speed on the speed element
speed.innerHTML = position.coords.speed
  ? (position.coords.speed * 3.6).toFixed(1)
  : 0;

console.log(position);
}

// Error callback function for geolocation
function handleError(error) {
console.log(error.message);
}

// Options for geolocation
const options = { enableHighAccuracy: true };

// Create a new ride
currentRide = createNewRide();

// Start watching the geolocation position
watchId = navigator.geolocation.watchPosition(
handleSuccess,
handleError,
options
);

// Hide the start button and show the stop button
startBtn.classList.add("d-none");
stopBtn.classList.remove("d-none");
});

// Add click event listener to the stop button
stopBtn.addEventListener("click", () => {
// If watchId is not set, return (avoid duplicate stop)
if (!watchId) {
return;
}

// Clear the geolocation watch
navigator.geolocation.clearWatch(watchId);
watchId = null;

// Update the stop time of the current ride
updateStopTime(currentRide);
currentRide = null;

// Hide the stop button and show the start button
stopBtn.classList.add("d-none");
startBtn.classList.remove("d-none");

// Redirect to the homepage
window.location.href = "./";
});