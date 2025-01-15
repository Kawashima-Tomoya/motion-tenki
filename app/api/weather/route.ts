import process from 'node:process'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const geo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.WEATHER_API_KEY}`
  const res = await fetch(geo)
  const data = await res.json()
  const lat = data[0].lat
  const lon = data[0].lon

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${process.env.WEATHER_API_KEY}&lang=ja`
  const response = await fetch(url)
  const weather = await response.json()

  return Response.json({ weather })
}
