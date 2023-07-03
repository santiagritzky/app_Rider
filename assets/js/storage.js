// Function to create a new ride
function createNewRide() {
  // Generate a unique rideId using the current timestamp
  const rideId = Date.now();

  // Create a new rideRecord object with initial values
  const rideRecord = {
    data: [],
    startTime: rideId,
    stopTime: null,
  };

  // Save the rideRecord to localStorage using the rideId as the key
  saveRideRecord(rideId, rideRecord);

  // Return the rideId
  return rideId;
}

// Function to delete a ride
function deleteRide(rideId) {
  // Remove the ride from localStorage using the rideId as the key
  localStorage.removeItem(rideId);
}

// Function to get all rides
function getAllRides() {
  // Return an array of key-value pairs from localStorage
  return Object.entries(localStorage);
}

// Function to get a ride record by rideId
function getRideRecord(rideId) {
  // Retrieve the rideRecord from localStorage using the rideId as the key
  // Parse the JSON string to convert it back to an object
  return JSON.parse(localStorage.getItem(rideId));
}

// Function to save a ride record to localStorage
function saveRideRecord(rideId, rideRecord) {
  // Convert the rideRecord object to a JSON string and save it to localStorage using the rideId as the key
  localStorage.setItem(rideId, JSON.stringify(rideRecord));
}

// Function to add a position to a ride
function addPosition(rideId, position) {
  // Retrieve the rideRecord from localStorage using the rideId
  const rideRecord = getRideRecord(rideId);

  // Create a new data object with position information
  const newData = {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
    timestamp: position.timestamp,
  };

  // Push the new data object to the rideRecord's data array
  rideRecord.data.push(newData);

  // Save the updated rideRecord to localStorage
  saveRideRecord(rideId, rideRecord);
}

// Function to update the stopTime of a ride
function updateStopTime(rideId) {
  // Retrieve the rideRecord from localStorage using the rideId
  const rideRecord = getRideRecord(rideId);

  // Update the stopTime of the rideRecord with the current timestamp
  rideRecord.stopTime = Date.now();

  // Save the updated rideRecord to localStorage
  saveRideRecord(rideId, rideRecord);
}
