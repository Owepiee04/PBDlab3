const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

function getCached(key) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    const { data, timestamp } = JSON.parse(item);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // Ignore storage quota errors
  }
}

export async function fetchWeather(city) {
  const cacheKey = `weather_${city.toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the name and try again.');
    }
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your .env configuration.');
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

export async function fetchForecast(city) {
  const cacheKey = `forecast_${city.toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found.');
    }
    throw new Error('Failed to fetch forecast data. Please try again.');
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}
