import process from 'node:process'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`

  const res = await fetch(url)
  const weather = await res.json()

  return Response.json({ weather })
}
