const apiKey = '24cae4f113b3a2c3c240e37d4df6664a';

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('city').value;
  getWeather(city);
});

document.getElementById('city').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = document.getElementById('city').value;
        getWeather(city);
    }
});

async function getWeather(city){
  document.getElementById('loading').style.display = 'block';
  document.getElementById('weather-info').style.display = 'none';
  
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

     //document.getElementById('loading').style.display = 'none';
    
    if (response.ok){
      const data = await response.json();
      // Introduce a 2-second delay
      setTimeout(() => {
          document.getElementById('loading').style.display = 'none';
          displayWeather(data);
      }, 1000); // 2-second delay
    }
    else{
      throw new Error('Unable to fetch weather data');
    }
    
  } catch (error){
  document.getElementById('weather-info').innerHTML = `<p>${"Invalid city name"}</p>`;
  }
};

function displayWeather(data) {

  document.getElementById('location').innerText = ` ${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
  document.getElementById('feelslike').innerText = `Feels like: ${data.main.feels_like}°C`;
  document.getElementById('weather').innerText = `Weather: ${data.weather[0].description}`;
  
  document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').innerText = `Wind speed: ${data.wind.speed} m/s`;

  document.getElementById('weather-info').style.display = 'block';
}
