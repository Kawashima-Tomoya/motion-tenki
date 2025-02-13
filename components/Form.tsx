'use client'

import { useActionState, useEffect, useState } from 'react'
import type { WeatherResponse } from '~/actions/getWeather'
import { getWeather } from '~/actions/getWeather'
import { DayWeather } from './DayWeather'
import { WeatherDetail } from './WeatherDetail'

export function Form() {
  const initialState: WeatherResponse = {
    weather: [],
    city: '',
    message: '',
  }
  const [weatherState, formAction, isPending] = useActionState(
    getWeather,
    initialState,
  )
  const [_city, setCity] = useState('')
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  useEffect(() => {
    if (weatherState.weather.length > 0) {
      setSelectedDay(weatherState.weather[0].dt)
    }
  }, [weatherState.weather])

  const handleDayClick = (day: any) => {
    setSelectedDay(day.dt)
  }

  const selectedDayData = weatherState.weather.find((day: any) => day.dt === selectedDay) || null

  return (
    <div className="mt-8 text-center">
      <form action={formAction} className="grid gap-3 max-sm:grid-cols-[1fr_auto] sm:flex sm:justify-center" method="post">
        <input
          type="text"
          placeholder="都市名を入力"
          className="rounded border p-2 sm:w-60"
          name="city"
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit" className="rounded bg-indigo-600 px-4 py-2 text-white" disabled={isPending}>検索</button>
        { weatherState.message && <p className="mt-4 text-sm text-red-400">{weatherState.message}</p> }
      </form>

      <div>
        {weatherState.city && (
          <p className="mt-8 text-xl font-bold">
            {`${weatherState.city}の天気`}
          </p>
        )}

        <WeatherDetail data={selectedDayData} />
        { weatherState.weather.length
          ? (
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                {weatherState.weather.map((day: any) => (
                  <DayWeather
                    key={day.dt}
                    data={day}
                    isSelected={day.dt === selectedDay}
                    onClick={() => handleDayClick(day)}
                  />
                ))}
              </div>
            )
          : (
              isPending
                ? (
                    <p className="mt-8 text-xl">Loading...</p>
                  )
                : null
            )}
      </div>
    </div>
  )
}
