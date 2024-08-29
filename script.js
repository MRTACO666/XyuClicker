const totalUsersElement = document.getElementById('totalUsers');

// Function to determine if it's day or night
function isDaytime() {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18; // Daytime between 6 AM and 6 PM
}

function updateStats() {
  let totalUsers;

  if (isDaytime()) {
    // Daytime: Random between 1720 and 1572
    totalUsers = Math.floor(Math.random() * (1720 - 1572 + 1)) + 1572;
  } else {
    // Nighttime: Random between 200 and 249
    totalUsers = Math.floor(Math.random() * (249 - 200 + 1)) + 200;
  }

  totalUsersElement.textContent = totalUsers;
}

// Update the stats every 5 seconds
setInterval(updateStats, 5000);

// Initial display
updateStats();
