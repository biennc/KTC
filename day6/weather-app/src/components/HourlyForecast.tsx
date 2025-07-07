import React, { useState, useEffect } from 'react';
import styles from './HourlyForecast.module.css';

interface Hour {
  time: string;
  temp_c: number;
  condition: {
    icon: string;
  };
}

interface ForecastDay {
  hour: Hour[];
}

interface ForecastData {
  forecastday: ForecastDay[];
}

interface HourlyProps {
  forecastData: ForecastData;
}

const HourlyForecast: React.FC<HourlyProps> = ({ forecastData }) => {
  const [hours, setHours] = useState<Hour[]>([]);

  useEffect(() => {
    const processHours = () => {
      if (!forecastData) return [];
      
      const allHours = forecastData.forecastday.flatMap(day => day.hour);
      const now = new Date();
      
      // Find the next 24 hours starting from current time
      const currentIndex = allHours.findIndex(hour => {
        const hourDate = new Date(hour.time);
        return hourDate >= now;
      });
      
      return currentIndex !== -1 
        ? allHours.slice(currentIndex, currentIndex + 24)
        : allHours.slice(0, 24);
    };

    setHours(processHours());
  }, [forecastData]);

  const formatTime = (timeString: string, index: number) => {
    if (index === 0) return 'Now';
    
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.hourlyForecast}>
      <h2>Hourly Forecast</h2>
      <div className={styles.forecastContainer}>
        {hours.map((hour, index) => (
          <div key={`${hour.time}-${index}`} className={styles.forecastItem}>
            <div className={styles.time}>{formatTime(hour.time, index)}</div>
            <img 
              src={`https:${hour.condition.icon}`} 
              alt="Weather icon" 
              className={styles.forecastIcon} 
            />
            <div className={styles.temperature}>{hour.temp_c}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;