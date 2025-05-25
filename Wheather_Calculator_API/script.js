const apiKey = 'c78d5a52eeb3e11a7f730e76d6abb87d'; 
const weatherDiv = document.getElementById('weather');

function toggleTheme() {
  document.body.classList.toggle('light');
}

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
  }, () => {
    alert("Location access denied.");
  });
}

async function fetchWeather(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) {
      weatherDiv.innerHTML = `<p>❌ ${data.message}</p>`;
      return;
    }
    showWeather(data);
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error fetching data</p>`;
  }
}

function showWeather(data) {
  const { name, sys, weather, main, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  weatherDiv.innerHTML = `
    <h3>${name}, ${sys.country}</h3>
    <img src="${iconUrl}" alt="${weather[0].description}" />
    <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
    <p>🌡️ Temp: ${main.temp}°C (Feels like: ${main.feels_like}°C)</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>🌬️ Wind: ${wind.speed} m/s</p>
  `;
}
