const apiKey = '24cae4f113b3a2c3c240e37d4df6664a';

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('city').value;
  getWeather(city);
});

async function getWeather(city){
  document.getElementById('loading').style.display = 'block';
  document.getElementById('weather-info').innerHTML = '';
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

  document.getElementById('location').innerText = data.name;
  
    const weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels like: ${data.main.feels_like}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>    
    `;
    document.getElementById('weather-info').innerHTML = weather;
}
