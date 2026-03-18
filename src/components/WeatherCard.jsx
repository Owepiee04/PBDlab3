import './WeatherCard.css';

export default function WeatherCard({ data }) {
  const { name, sys, main, weather, wind, visibility } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="weather-card">
      <div className="weather-card__location">
        <h2>
          {name}, {sys.country}
        </h2>
        <p className="weather-card__date">{dateStr}</p>
      </div>

      <div className="weather-card__main">
        <img
          src={iconUrl}
          alt={weather[0].description}
          className="weather-card__icon"
          loading="lazy"
        />
        <div className="weather-card__temp">
          <span className="weather-card__temp-value">
            {Math.round(main.temp)}°C
          </span>
          <span className="weather-card__condition">{weather[0].main}</span>
          <span className="weather-card__description">
            {weather[0].description}
          </span>
        </div>
      </div>

      <div className="weather-card__details">
        <div className="weather-card__detail-item">
          <span className="label">Feels Like</span>
          <span className="value">{Math.round(main.feels_like)}°C</span>
        </div>
        <div className="weather-card__detail-item">
          <span className="label">Humidity</span>
          <span className="value">{main.humidity}%</span>
        </div>
        <div className="weather-card__detail-item">
          <span className="label">Wind</span>
          <span className="value">{Math.round(wind.speed)} m/s</span>
        </div>
        <div className="weather-card__detail-item">
          <span className="label">Visibility</span>
          <span className="value">{(visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="weather-card__detail-item">
          <span className="label">Min</span>
          <span className="value">{Math.round(main.temp_min)}°C</span>
        </div>
        <div className="weather-card__detail-item">
          <span className="label">Max</span>
          <span className="value">{Math.round(main.temp_max)}°C</span>
        </div>
      </div>
    </div>
  );
}
