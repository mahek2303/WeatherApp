const apiKey = '24cae4f113b3a2c3c240e37d4df6664a';

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();
  getWeather(city);
});

document.getElementById('city').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = document.getElementById('city').value.trim();
        getWeather(city);
    }
});

async function getWeather(city){

  const loadingElement = document.getElementById('loading');
  const weatherInfoElement = document.getElementById('weather-info');

  if (!city) {
    loadingElement.style.display = 'none';
    weatherInfoElement.innerHTML = `<p>Please enter a city name.</p>`;
    weatherInfoElement.style.display = 'block';
    return;
  }

  loadingElement.style.display = 'block';
  weatherInfoElement.style.display = 'none';

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    if (response.ok) {
      const data = await response.json();
      setTimeout(() => {
        loadingElement.style.display = 'none';
        displayWeather(data);
      }, 200); // 2-second delay
    } else {
      throw new Error('Unable to fetch weather data');
    }
  } catch (error) {
    loadingElement.style.display = 'none';
    weatherInfoElement.innerHTML = `<p>Invalid city name. Please try again.</p>`;
    weatherInfoElement.style.display = 'block';
  }
}

function displayWeather(data) {
  const weatherInfoElement = document.getElementById('weather-info');

  // Clear any existing messages and display weather info
  weatherInfoElement.innerHTML = `
    <div class="details">
      <img src="icons/location icon.webp" alt="Location Icon" class="icon">
      <p id="location" class = "imageText">Location: ${data.name}, ${data.sys.country}</p>
      <img src="icons/temperature icon.png" alt="Temperature Icon" class="icon">
      <p id="temperature" class = "imageText">Temperature: ${data.main.temp}°C</p>
      <img src="icons/feels like icon.png" alt="Feels like Icon" class="icon">
      <p id="feelslike" class = "imageText">Feels like: ${data.main.feels_like}°C</p>
      <img src="icons/weather icon.jpg" alt="Weather Icon" class="icon" id="weatherIcon">
      <p id="weather" class = "imageText">Weather: ${data.weather[0].description}</p>
      <img src="icons/humidity icon.png" alt="Humidity Icon" class="icon">
      <p id="humidity" class = "imageText">Humidity: ${data.main.humidity}%</p>
      <img src="icons/wind icon.png" alt="Wind Icon" class="icon">
      <p id="wind" class = "imageText">Wind speed: ${data.wind.speed} m/s</p>
    </div>
  `;
  weatherInfoElement.style.display = 'block';
}
