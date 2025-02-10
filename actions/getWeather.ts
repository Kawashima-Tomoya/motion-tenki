'use server'

import process from 'node:process'
import { getGeoLocation } from './getGeoLocation'

export interface WeatherResponse {
  weather: []
  message: string
}

const ERROR_MESSAGES = {
  CITY_REQUIRED: '都市名を入力してください',
  WEATHER_FAILED: '天気情報の取得に失敗しました',
  GENERAL_ERROR: '情報の取得に失敗しました。再度お試しください。',
} as const

function createResponse(weather: [], message = ''): WeatherResponse {
  return {
    weather,
    message,
  }
}

async function getWeatherData(lat: number, lon: number) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${process.env.WEATHER_API_KEY}&lang=ja`,
  )
  if (!res.ok)
    return createResponse([], ERROR_MESSAGES.WEATHER_FAILED)

  const data = await res.json()
  return data.daily
}

export async function getWeather(_prevState: any, formData: FormData) {
  const city = formData.get('city') as string
  if (!city)
    return createResponse([], ERROR_MESSAGES.CITY_REQUIRED)

  try {
    const { lat, lon } = await getGeoLocation(city)
    const weather = await getWeatherData(lat, lon)
    return createResponse(weather, '')
  }
  catch (error) {
    console.error(error)
    return createResponse(
      [],
      error instanceof Error ? error.message : ERROR_MESSAGES.GENERAL_ERROR,
    )
  }
}
