import { getWeatherInfo } from './api.js'

const data = await getWeatherInfo('Tandil');

console.log(`It is currently ${data.current.temperature} degrees outside. There is a ${data.current.precip}% chance of rain. It feels like ${data.current.feelslike} degrees`);