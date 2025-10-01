document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("task-list");
  const addBtn = document.getElementById("add-btn");
  const addIcon = document.getElementById("add-icon");

  function addTask() {
    const task = prompt("Enter new task:");
    if (task) {
      const label = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = task;

      const textNode = document.createTextNode(" " + task + " ");

      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fa-solid fa-trash delete";

      label.appendChild(checkbox);
      label.appendChild(textNode);
      label.appendChild(deleteIcon);

      taskList.appendChild(label);
    }
  }
  taskList.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
      e.target.closest("label")?.remove();
    }
  });
addBtn.addEventListener("click", addTask);
  addIcon.addEventListener("click", addTask);
  async function initClock() {
    try {
      const res = await fetch("https://worldtimeapi.org/api/timezone/Africa/Lagos");
      const data = await res.json();
      let currentTime = new Date(data.datetime);

      function updateClock() {
        let hours = currentTime.getHours().toString().padStart(2, "0");
        let minutes = currentTime.getMinutes().toString().padStart(2, "0");
        let seconds = currentTime.getSeconds().toString().padStart(2, "0");
        document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;

        const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
        document.getElementById("date").textContent = currentTime.toLocaleDateString("en-US", options);

        currentTime.setSeconds(currentTime.getSeconds() + 1);
      }

      updateClock();
      setInterval(updateClock, 1000);
    } catch (error) {
      console.error("Error fetching time:", error);
      document.getElementById("date").textContent = "Failed to load time.";
    }
  }
  initClock();
const weatherBtn = document.getElementById("getWeatherBtn");
  weatherBtn.addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");

    if (!city) {
      resultDiv.textContent = "Please enter a city name.";
      return;
    }

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        resultDiv.textContent = "City not found.";
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      const weather = weatherData.current_weather;

      resultDiv.innerHTML = `
        <p><strong>${name}, ${country}</strong></p>
        <p>🌡️ Temperature: ${weather.temperature}°C</p>
        <p>💨 Wind: ${weather.windspeed} km/h</p>
        <p>⏱️ Time: ${weather.time}</p>
      `;
    } catch (error) {
      resultDiv.textContent = "Error: " + error.message;
    }
  });
const adviceText = document.getElementById("adviceText");
const adviceBtn = document.getElementById("adviceBtn");

async function getAdvice() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    adviceText.textContent = `"${data.slip.advice}"`;
  } catch (error) {
    adviceText.textContent = "Oops! Could not load advice.";
  }
}
if (adviceText) getAdvice();
if (adviceBtn) adviceBtn.addEventListener("click", getAdvice);

});


