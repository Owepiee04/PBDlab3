import { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeather, fetchForecast } from './utils/weatherApi';
import './App.css';

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next === 'dark' ? 'dark' : '');
  };

  const handleSearch = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__title-group">
            <span className="app__logo">WD</span>
            <h1 className="app__title">Weather Dashboard</h1>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="app__main">
        <div className="app__search-wrap">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="app__error" role="alert">
            Error: {error}
          </div>
        )}

        {!loading && !error && !weather && (
          <div className="app__welcome">
            <div className="app__welcome-icon">Weather</div>
            <h2>Search for a city to get started</h2>
            <p>Enter a city name above to see the current weather and 5-day forecast.</p>
          </div>
        )}

        {weather && (
          <div className="app__content">
            <WeatherCard data={weather} />
            {forecast && <ForecastCard data={forecast} />}
          </div>
        )}
      </main>

      <footer className="app__footer">
        <p>
          Data provided by{' '}
          <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">
            OpenWeatherMap
          </a>
        </p>
      </footer>
    </div>
  );
}
