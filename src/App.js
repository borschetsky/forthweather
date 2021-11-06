import { useEffect, useState } from 'react';
import axios from 'axios';
import Config from './config';
import usePosition from './hooks/usePosition';
import HourItem from './components/HourItem';
import Loader from "./components/Loader";
import Error from './components/Error';
import './App.scss';

import { generateIconImageLink } from './utils/utils';

function App() {
  const { position, positionError } = usePosition();

  const [weatherData, setWeatherData] = useState(null);
  const [adWeatherData, setAdWeatherData] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [hourData, setHourData ] = useState(null);
  const [isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (position) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${Config.apiKey}`)
        .then((response) => {
          setWeatherData(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setErrorMessage('Error fetching data');
          setIsLoading(false);
        })
    }
  }, [position]);

  useEffect(() => {
    if(positionError){
      setErrorMessage(positionError);
      setIsLoading(false);
    }
  }, [positionError]);

  useEffect(() => {
    if (weatherData) {
      const result = {};
      weatherData.list?.forEach((item) => {
        const key = new Date(item.dt_txt).toLocaleDateString();
        if (!(key in result)) {
          result[key] = [item];
        } else {
          result[key].push(item)
        }
      })
      setAdWeatherData(result)
    }
  }, [weatherData])

  return (
    <div className="App">
      {errorMessage && <Error/>}
      {isLoading &&  <Loader />}
      {weatherData && (
        <>
          <div className="weather-container">
            <div className="weather-header">
              <div>{weatherData?.city?.name}, {weatherData?.city?.country}</div>
            </div>

            <div className="weather-info-container">
              <div className="weather-info__date"> {new Date(weatherData?.list[0].dt_txt).toLocaleDateString('default', { month: 'long', weekday: 'long', day: 'numeric' })}</div>
              <div className="weather-info__temperature">
                <img src={generateIconImageLink(weatherData?.list?.[0]?.weather[0].icon)} alt="wether_icon" />
                <div className="current-temp">
                  {Math.trunc(weatherData?.list?.[0]?.main.temp)}°
                </div>
              </div>
              <div className="temperature">
                It is {weatherData?.list?.[0]?.weather[0].main}
              </div>
              <div className="day-selector">
                {adWeatherData && Object.getOwnPropertyNames(adWeatherData).map((item, itemIdx) => {
                  return <HourItem 
                            key={itemIdx} 
                            weatherData={adWeatherData[item][0]} 
                            date={item} 
                            onClick={(date) => setHourData(date) } 
                            currentDateSelected={hourData}/>
                })}
              </div>
              {hourData && (
                <div className="hour-data">
                  <div className="hour-data__title">
                    Hour brodcast
                  </div>
                  <div className="hour-data__cards">
                  {adWeatherData[hourData].map((item, itemIdx) => {
                    return <HourItem key={itemIdx} weatherData={item} date={item.dt_txt} isTime={true}/>
                  })}
                  </div>
              </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
