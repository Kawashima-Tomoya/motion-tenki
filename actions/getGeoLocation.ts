'use server'

import process from 'node:process'

const ERROR_MESSAGES = {
  GEO_FAILED: '地理情報の取得に失敗しました',
  CITY_NOT_FOUND: '都市が見つかりません',
} as const

export async function getGeoLocation(city: string) {
  const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.WEATHER_API_KEY}`)
  if (!res.ok)
    throw new Error(ERROR_MESSAGES.GEO_FAILED)

  const data = await res.json()
  if (!data.length)
    throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND)

  return { lat: data[0].lat, lon: data[0].lon }
}
