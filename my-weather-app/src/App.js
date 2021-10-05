import { useEffect, useState } from 'react';
import { WeatherDay } from './components/WeatherDay';
import { LocationSearch } from './components/LocationSearch';
import { API_KEY } from './constants';
import './App.css';

const App = () => {

  const [weatherInfo, setWeatherInfo] = useState();
  const [locationKey, setLocationKey] = useState('');
  const [location, setLocation] = useState();

  useEffect(() => {
      if (locationKey) {
        fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
        )
        .then(res => res.json())
        .then(res => setWeatherInfo(res.DailyForecasts.map(df => {
          let d = new Date(df.Date);

          return {
            min: df.Temperature.Minimum.Value,
            max: df.Temperature.Maximum.Value,
            weatherType: df.Day.IconPhrase,
            iconKey: df.Day.Icon,
            forecastDate: d.toDateString()
          }
        })))
      }
  }, [locationKey]);

  return (
    <div className='app'>

      <div className='title'>
        <h1> 5 Day Weather Forecast </h1>
      </div>

      <div className='locSearch'>
        <LocationSearch locationKeyFound={cityInfo => {
            setLocationKey(cityInfo.key);
            setLocation(cityInfo.name + ', ' + cityInfo.state);
          }}
        />
      </div>

      <div className='cityInfo'>
        <h2>{location}</h2>
      </div>

      <div className='weatherDays'>
        {!!weatherInfo && weatherInfo.map((i, index) => (
            <div key={index}>
              <WeatherDay min={i.min} max={i.max} weatherType={i.weatherType} iconKey={i.iconKey} forecastDate={i.forecastDate} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;