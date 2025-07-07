import './App.css'
const key = 'c9a0ca46550648b29ce125849232709'
const currentWeatherUrl = 'https://api.weatherapi.com/v1/current.json?key=c9a0ca46550648b29ce125849232709&q=Da%20nang&lang=vi'


import React, { useEffect, useState } from 'react';

function App() {
  const [city, setCity] = useState('Hanoi');
  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await fetch(currentWeatherUrl)
      const data = await response.json()
    } catch (error) {
      console.log(error);
      
    }
  }
  }, [])
  // Dummy data for UI
  const weather = {
    temp: 26,
    condition: 'Sunny',
    icon: '',
    humidity: 41,
    wind: '3,2',
    forecast: [
      { hour: 'Now', temp: 26, icon: '☀️' },
      { hour: '15:00', temp: 25, icon: '☀️' },
      { hour: '16:00', temp: 24, icon: '☀️' },
      { hour: '17:00', temp: 24, icon: '☀️' },
    ],
  };

  return (
    <div className="weather-app">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Hanoi"
        />
      </div>
      <div className="main-weather">
        <div className="temp-icon">
          <span className="temp">{weather.temp}°</span>
          <span className="icon">{weather.icon}</span>
        </div>
        <div className="condition">{weather.condition}</div>
      </div>
      <div className="details">
        <div className="detail-item">
          <div className="label">Humidity</div>
          <div className="value">{weather.humidity}%</div>
        </div>
        <div className="divider" />
        <div className="detail-item">
          <div className="label">Wind</div>
          <div className="value">{weather.wind} km/h</div>
        </div>
      </div>
      <div className="forecast">
        <div className="forecast-title">Now</div>
        <div className="forecast-list">
          {weather.forecast.map((item, idx) => (
            <div className="forecast-item" key={idx}>
              <div className="forecast-icon">{item.icon}</div>
              <div className="forecast-temp">{item.temp}°</div>
              <div className="forecast-hour">{item.hour}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
