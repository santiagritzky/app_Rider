const rideListElement = document.querySelector("#rideList");

const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
  const ride = JSON.parse(value);
  ride.id = id;
  const firstPosition = ride.data[0];
  console.log(firstPosition);
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );
  const itemElement = document.createElement("li");
  const cityDiv = document.createElement("div");
  cityDiv.innerText = `City: ${firstLocationData.city} -  ${firstLocationData.countryCode}`;

  const maxSpeedDiv = document.createElement("div");
  maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} K/hm`;

    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)}`;

  itemElement.append(cityDiv);
  itemElement.appendChild(maxSpeedDiv);
  itemElement.appendChild(distanceDiv);

  itemElement.id = ride.id;
  rideListElement.appendChild(itemElement);
  // console.log(ride);
});

async function getLocationData(latitude, longitude) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  const response = await fetch(url);
  return await response.json();
}

function getMaxSpeed(positions) {
  let maxSpeed = 0;
  positions.forEach((postion) => {
    if (positions.speed != 0 && positions.speed > maxSpeed) {
      maxSpeed = positions.speed;
    }
  });
  return (maxSpeed * 3.6).toFixed(0);
}

function getDistance(positions) {
  const earthRadius = 6371;
  let totalDistance = 0;
  for (let i = 0; i < positions.length - 1; i++) {
    const p1 = {
      latitude: positions[i].latitude,
      longitude: positions[i].longitude,
    };
    const p2 = {
      latitude: positions[i + 1].latitude,
      longitude: positions[i + 1].longitude,
    };

    const deltaLatitude = toRad(p2.latitude - p1.latitude);
    const deltaLongitude = toRad(p2.longitude - p1.longitude);

    const A =
        Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2) *
        Math.cos(toRad(p1.latitude)) *
        Math.cos(toRad(p2.latitude));

        const C = 2 * Math.atan2(Math.sqrt(A),Math.sqrt(1-A));
        const distance = earthRadius * C;

        totalDistance += distance;
  }

  function toRad(degree) {
    return (degree * Math.PI) / 180;
  }

  return totalDistance.toFixed(2);

}
