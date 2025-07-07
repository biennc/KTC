import React from 'react';
import styles from './CurrentWeather.module.css';

interface CurrentProps {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const CurrentWeather: React.FC<CurrentProps> = ({
  temperature,
  condition,
  icon,
  humidity,
  windSpeed,
}) => {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.temperatureContainer}>
        <div className={styles.temperature}>{temperature}°</div>
        <div className={styles.conditionContainer}>
          <img 
            src={`https:${icon}`} 
            alt={condition} 
            className={styles.weatherIcon} 
          />
          <div className={styles.condition}>{condition}</div>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailCard}>
          <span>Humidity</span>
          <span className={styles.detailValue}>{humidity}%</span>
        </div>
        <div className={styles.detailCard}>
          <span>Wind</span>
          <span className={styles.detailValue}>{windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;