/* eslint-disable no-console */

'use client'

import { useState } from 'react'

export default function Page() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState('')

  async function getWeather() {
    const res = await fetch(`/api/weather?city=${city}`)
    const data = await res.json()
    console.log(data)
    setWeather(data.weather.current.weather[0].description)
  }

  return (
    <div className="mt-8 text-center">
      <input
        type="text"
        placeholder="都市名を入力"
        className="mb-5 mr-3 border p-2"
        onChange={(e) => {
          setCity(e.target.value)
        }}
        value={city}
      />
      <button type="button" className="rounded bg-indigo-600 p-2 text-white" onClick={getWeather}>
        天気情報を取得
      </button>
      <h1>
        City:
        {city}
      </h1>
      <p>
        Weather:
        {weather}
      </p>
    </div>
  )
}
