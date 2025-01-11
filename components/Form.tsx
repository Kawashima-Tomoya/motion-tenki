'use client'

import { useActionState, useState } from 'react'
import { getWeather } from '~/actions/getWeather'

export function Form() {
  const [city, setCity] = useState('')

  const initialState = {
    city: '',
    weather: '',
  }

  const [state, formAction, isPending] = useActionState(
    getWeather,
    initialState,
  )

  return (
    <div className="mt-8 text-center">
      <form action={formAction}>
        <input
          type="text"
          placeholder="都市名を入力"
          className="mr-3 border p-2"
          value={city}
          name="city"
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit" className="rounded bg-indigo-600 p-2 text-white" disabled={isPending}>天気を取得</button>
      </form>
      <div className="mx-auto mt-5 w-[280px] text-left">
        <h1 className="">
          City:&nbsp;
          {state.city}
        </h1>
        <p className="text-left">
          Weather:&nbsp;
          {state.weather}
        </p>
      </div>
    </div>
  )
}
