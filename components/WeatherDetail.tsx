import type { WeatherData } from '../types/weather'
import { motion } from 'framer-motion'
import { Cloud, CloudRain, CloudSun, Droplets, Sun, Wind } from 'lucide-react'

// interface WeatherDetailProps {
//   data: WeatherData
// }

// const iconMap = {
//   'sun': { icon: Sun, color: '#FFD700' },
//   'cloud': { icon: Cloud, color: '#A9A9A9' },
//   'cloud-sun': { icon: CloudSun, color: '#87CEEB' },
//   'cloud-rain': { icon: CloudRain, color: '#4682B4' },
// }

export function WeatherDetail({ data }: any) {
  // const { icon: Icon, color } = iconMap[data.icon as keyof typeof iconMap]
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
            {/* <Icon className="size-16 sm:size-24" style={{ color }} /> */}
            <div className="ml-4 sm:ml-6">
              <p className="text-lg font-medium text-weather-text-light dark:text-weather-text-dark sm:text-xl">
                {data.description}
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
              {data.windSpeed}
              m/s
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
