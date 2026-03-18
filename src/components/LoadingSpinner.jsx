import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="spinner-wrap" role="status" aria-label="Loading weather data">
      <div className="spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  );
}
