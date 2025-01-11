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
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`)
  if (!res.ok) {
    return {
      city,
      weather: 'サーバーエラーが発生しました',
    }
  }

  const data = await res.json()
  const weather = data.weather[0].main

  return { city, weather }
}
