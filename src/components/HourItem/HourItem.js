import './HourItem.scss';

import { generateIconImageLink } from '../../utils/utils';

const HourItem = (props) => {
  const { weatherData, date, onClick = () => {}, isTime = false, currentDateSelected = null } = props;

  const timeOrWeekDay = !isTime ? new Date(weatherData?.dt_txt).toLocaleDateString('default', {weekday: 'short'}) 
    : new Date(weatherData?.dt_txt).toLocaleTimeString('default', {hour12: false, hour: '2-digit', minute: '2-digit'});

  return (
    <div className={`hour-item ${date === currentDateSelected && 'active'}`} onClick={() => {
      onClick(date)
    }}>
      <div className="time">{timeOrWeekDay}</div>
      <img src={generateIconImageLink(weatherData?.weather[0].icon)} alt="wether-icon" />
      <div className="temperature">
        <div className="min">{Math.trunc(weatherData.main.temp_min)} <small>°C</small> </div>
        <div className="max">{Math.trunc(weatherData.main.temp_max)} <small>°C</small></div>
      </div>
    </div>
  )
}

export default HourItem;