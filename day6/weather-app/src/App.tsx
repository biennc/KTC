import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import SearchBar from './components/SearchBar';

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: {
      hour: {
        time: string;
        temp_c: number;
        condition: {
          icon: string;
        };
      }[];
    }[];
  };
}

const API_KEY = 'c9a0ca46550648b29ce125849232709';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchQuery, setSearchQuery] = useState('Hanoi');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchQuery}&days=2`
        );
        
        if (!response.ok) {
          throw new Error('City not found');
        }
        
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className={styles.loading}>Loading weather data...</div>}
        {error && <div className={styles.error}>{error}</div>}
        
        {weatherData && !loading && !error && (
          <>
            <CurrentWeather 
              temperature={weatherData.current.temp_c}
              condition={weatherData.current.condition.text}
              icon={weatherData.current.condition.icon}
              humidity={weatherData.current.humidity}
              windSpeed={weatherData.current.wind_kph}
            />
            
            <HourlyForecast 
              forecastData={weatherData.forecast}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;