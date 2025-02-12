'use client'

import { useActionState, useState } from 'react'
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
  const [selectedDay, setSelectedDay] = useState('')

  const handleDayClick = (date: string) => {
    setSelectedDay(date)
  }

  // const selectedDayData = weatherState.find((day: any) => day.dt === selectedDay) || weatherState[0]

  return (
    <div className="mt-8 text-center">
      <form action={formAction}>
        <input
          type="text"
          placeholder="都市名を入力"
          className="mr-3 rounded border p-2"
          name="city"
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit" className="rounded bg-indigo-600 p-2 text-white" disabled={isPending}>天気を取得</button>
        { weatherState.message && <p className="mt-4 text-sm text-red-400">{weatherState.message}</p> }
      </form>

      <div>
        {weatherState.city && (
          <p className="mt-8 font-bold">
            {`${weatherState.city}の天気`}
          </p>
        )}

        {/* <WeatherDetail data={selectedDayData} /> */}
        { weatherState.weather.length
          ? (
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                {weatherState.weather.map((day: any) => (
                  <DayWeather
                    key={day.dt}
                    data={day}
                    isSelected={day.dt === selectedDay}
                    onClick={() => handleDayClick(day.dt)}
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
