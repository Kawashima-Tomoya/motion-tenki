/* eslint-disable no-console */
'use server'

import process from 'node:process'

export async function getWeather(_prevState: any, formData: FormData) {
  const city = formData.get('city') as string
  if (!city) {
    return {
      city,
      weather: '',
      message: '都市名を入力してください',
    }
  }

  try {
    const resGeo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.WEATHER_API_KEY}`)
    if (!resGeo.ok) {
      return {
        city,
        weather: '',
        message: '地理情報の取得に失敗しました',
      }
    }
    const dataGeo = await resGeo.json()
    if (!dataGeo.length) {
      return {
        city,
        weather: '',
        message: '都市が見つかりません',
      }
    }
    const lat = dataGeo[0].lat
    const lon = dataGeo[0].lon

    const resWeather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${process.env.WEATHER_API_KEY}&lang=ja`)
    if (!resWeather.ok) {
      return {
        city,
        weather: '',
        message: '天気情報の取得に失敗しました',
      }
    }
    const dataWeather = await resWeather.json()
    console.log(dataWeather)
    console.log(dataWeather.current.weather)

    const weather = dataWeather.current.weather[0].description

    return { city, weather, message: '' }
  }
  catch (error) {
    console.error(error)
    return {
      city,
      weather: '',
      message: '情報の取得に失敗しました。再度お試しください。',
    }
  }
}

// このコードは、state.message が存在する場合は state.message を返し、
// 存在しない場合は state.weather を返します。
// const displayMessage = (state.message && state.message) || state.weather;

// 例:
// state = { message: 'エラーが発生しました', weather: '晴れ' } の場合、
// displayMessage は 'エラーが発生しました' になります。
//
// state = { message: '', weather: '晴れ' } の場合、
// displayMessage は '晴れ' になります。
