import axios from "axios";
import Config from './config';

const getPosition = async() => {
  const locationAPI = 'https://ip.nf/me.json';
  return await axios.get(locationAPI);
}

const getWether = async(latitude, longitude) => {
  const wetherAPI = `https://api.openweathermap.org/data/2.5/forecast`;
  if(latitude && longitude) {
    return axios.get(wetherAPI, {
      params: {
        lat: latitude,
        lon: longitude,
        units: 'metric',
        appid: Config.apiKey
      }
    })
  }
}

export { getPosition, getWether }