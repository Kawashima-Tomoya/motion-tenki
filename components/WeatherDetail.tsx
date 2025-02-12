import { motion } from 'framer-motion'
import { Cloud, CloudDrizzle, CloudLightning, CloudSnow, Droplets, Sun, Umbrella, Wind } from 'lucide-react'

const iconMap = {
  Clear: { icon: Sun, color: '#FFD700' },
  Clouds: { icon: Cloud, color: '#A9A9A9' },
  Rain: { icon: Umbrella, color: '#4682B4' },
  thunderstorm: { icon: CloudLightning, color: '#4B0082' },
  Drizzle: { icon: CloudDrizzle, color: '#778899' },
  Snow: { icon: CloudSnow, color: '#FFFFFF' },
}

export function WeatherDetail({ data }: any) {
  if (!data)
    return null

  const { icon: Icon, color } = iconMap[data.weather[0].main as keyof typeof iconMap]
  const date = new Date(data.dt * 1000)

  return (
    <motion.div
      className="glass mb-6 w-full rounded-lg p-4 sm:p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-4 text-xl font-bold text-weather-text-light dark:text-weather-text-dark sm:text-2xl">
        {date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-center sm:items-start">
          <div className="mb-2 flex items-center">
            <Icon className="size-16 sm:size-24" style={{ color }} />
            <div className="ml-4 sm:ml-6">
              <p className="text-lg font-medium text-weather-text-light dark:text-weather-text-dark sm:text-xl">
                {data.weather[0].description}
              </p>
              <p className="mt-1 text-2xl font-semibold sm:text-3xl">
                <span className="text-red-500 dark:text-red-400">
                  {Math.round(data.temp.max)}
                  °
                </span>
                {' '}
                /
                <span className="text-blue-500 dark:text-blue-400">
                  {Math.round(data.temp.min)}
                  °
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-3 sm:justify-start">
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
              {data.wind_speed}
              m/s
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
