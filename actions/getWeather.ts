/* eslint-disable no-console */
'use server'

import process from 'node:process'

export async function getWeather(_prevState: any, formData: FormData) {
  const city = formData.get('city') as string
  if (!city) {
    return {
      city: '',
      weather: '都市名を入力してください',
    }
  }

  const resGeo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.WEATHER_API_KEY}`)
  const dataGeo = await resGeo.json()
  const lat = dataGeo[0].lat
  const lon = dataGeo[0].lon

  const resWeather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${process.env.WEATHER_API_KEY}&lang=ja`)
  if (!resWeather.ok) {
    return {
      city,
      weather: '都市が見つかりません',
    }
  }
  const dataWeather = await resWeather.json()
  const weather = dataWeather.current.weather[0].description
  console.log(weather)

  return { city, weather }
}
