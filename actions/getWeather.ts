/* eslint-disable no-console */
'use server'

import process from 'node:process'

interface WeatherResponse {
  city: string
  weather: string
  message: string
}

const API = {
  GEO: 'http://api.openweathermap.org/geo/1.0/direct',
  WEATHER: 'https://api.openweathermap.org/data/3.0/onecall',
} as const

const ERROR_MESSAGES = {
  CITY_REQUIRED: '都市名を入力してください',
  GEO_FAILED: '地理情報の取得に失敗しました',
  CITY_NOT_FOUND: '都市が見つかりません',
  WEATHER_FAILED: '天気情報の取得に失敗しました',
  GENERAL_ERROR: '情報の取得に失敗しました。再度お試しください。',
} as const

function createResponse(city: string, weather = '', message = ''): WeatherResponse {
  return {
    city,
    weather,
    message,
  }
}

async function getGeoLocation(city: string) {
  const res = await fetch(`${API.GEO}?q=${city}&appid=${process.env.WEATHER_API_KEY}`)
  if (!res.ok)
    throw new Error(ERROR_MESSAGES.GEO_FAILED)

  const data = await res.json()
  if (!data.length)
    throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND)

  return { lat: data[0].lat, lon: data[0].lon }
}

async function getWeatherData(lat: number, lon: number) {
  const res = await fetch(
    `${API.WEATHER}?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${process.env.WEATHER_API_KEY}&lang=ja`,
  )
  if (!res.ok)
    throw new Error(ERROR_MESSAGES.WEATHER_FAILED)

  const data = await res.json()
  console.log(data)

  return data.current.weather[0].description
}

export async function getWeather(_prevState: any, formData: FormData) {
  const city = formData.get('city') as string
  if (!city)
    return createResponse('', '', ERROR_MESSAGES.CITY_REQUIRED)

  try {
    const { lat, lon } = await getGeoLocation(city)
    const weather = await getWeatherData(lat, lon)
    return createResponse(city, weather)
  }
  catch (error) {
    console.error(error)
    return createResponse(
      city,
      '',
      error instanceof Error ? error.message : ERROR_MESSAGES.GENERAL_ERROR,
    )
  }
}
