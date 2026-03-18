import './ForecastCard.css';

function groupForecastByDay(list) {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  const today = new Date().toISOString().split('T')[0];
  return Object.entries(days)
    .filter(([date]) => date !== today)
    .slice(0, 5);
}

export default function ForecastCard({ data }) {
  const days = groupForecastByDay(data.list);

  return (
    <div className="forecast">
      <h3 className="forecast__title">5-Day Forecast</h3>
      <div className="forecast__grid">
        {days.map(([date, items]) => {
          const midday =
            items.find((i) => i.dt_txt.includes('12:00:00')) ||
            items[Math.floor(items.length / 2)];
          const temps = items.map((i) => i.main.temp);
          const minTemp = Math.round(Math.min(...temps));
          const maxTemp = Math.round(Math.max(...temps));
          const icon = midday.weather[0].icon;
          const dayName = new Date(date + 'T12:00:00').toLocaleDateString(
            'en-US',
            { weekday: 'short' }
          );
          const dayNum = new Date(date + 'T12:00:00').toLocaleDateString(
            'en-US',
            { month: 'short', day: 'numeric' }
          );

          return (
            <div className="forecast__day" key={date}>
              <span className="forecast__day-name">{dayName}</span>
              <span className="forecast__day-date">{dayNum}</span>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={midday.weather[0].description}
                className="forecast__icon"
                loading="lazy"
              />
              <span className="forecast__condition">
                {midday.weather[0].main}
              </span>
              <div className="forecast__temps">
                <span className="forecast__max">{maxTemp}°</span>
                <span className="forecast__min">{minTemp}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
