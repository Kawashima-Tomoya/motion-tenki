import { motion } from 'framer-motion'
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudSnow, CloudSun, Droplets, Sun, Umbrella, Wind } from 'lucide-react'

const iconMap: { [key: string]: { icon: any, color: string } } = {
  Clear: { icon: Sun, color: '#FF7F50' },
  Clouds: { icon: Cloud, color: '#A9A9A9' },
  Rain: { icon: Umbrella, color: '#4682B4' },
  Thunderstorm: { icon: CloudLightning, color: '#4B0082' },
  Drizzle: { icon: CloudDrizzle, color: '#778899' },
  Snow: { icon: CloudSnow, color: '#FFFFFF' },
  Mist: { icon: CloudFog, color: '#A9A9A9' },
  Fog: { icon: CloudFog, color: '#A9A9A9' },
  CloudSun: { icon: CloudSun, color: '#FFD700' },
}

export function WeatherDetail({ data }: any) {
  if (!data)
    return null

  const weatherMain = data.weather[0].main as string
  const weatherConfig = iconMap[weatherMain] || iconMap.CloudSun
  const { icon: Icon, color } = weatherConfig
  const date = new Date(data.dt * 1000)

  return (
    <motion.div
      className="glass mb-6 mt-4 w-full rounded-lg p-4 sm:p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold text-weather-text-light dark:text-weather-text-dark sm:text-2xl">
        {date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-6">
        <div className="flex flex-col justify-self-center sm:items-start">
          <div className="max-sm: grid grid-cols-2 items-center gap-4 max-sm:gap-2">
            <Icon className="size-16 sm:size-24" style={{ color }} />
            <div className="grid grid-rows-2 ">
              <p className="self-center text-lg font-medium text-weather-text-light dark:text-weather-text-dark sm:text-xl">
                {data.weather[0].description}
              </p>
              <p className="text-xl font-semibold sm:text-3xl">
                <span className="text-red-500 dark:text-red-400">
                  {Math.round(data.temp.max)}
                  °
                </span>
                {' '}
                /
                {' '}
                <span className="text-blue-500 dark:text-blue-400">

                  {Math.round(data.temp.min)}
                  °
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-self-center">
          <p className="flex items-center text-weather-text-light dark:text-weather-text-dark">
            <Droplets className="mr-3 size-6 text-blue-500 dark:text-blue-400" />
            <span className="text-base sm:text-lg">
              湿度:
              {data.humidity}
              %
            </span>
          </p>
          <p className="flex items-center text-weather-text-light dark:text-weather-text-dark">
            <Wind className="mr-3 size-6 text-green-500 dark:text-green-400" />
            <span className="text-base sm:text-lg">
              風速:
              {data.wind_speed.toFixed(1)}
              m/s
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
