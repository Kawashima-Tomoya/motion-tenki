import type { WeatherData } from '../types/weather'
import { motion } from 'framer-motion'
import { Cloud, CloudDrizzle, CloudLightning, CloudSnow, CloudSun, Sun, Umbrella } from 'lucide-react'

// interface DayWeatherProps {
//   data: WeatherData
//   isSelected: boolean
//   onClick: () => void
// }

const iconMap = {
  Clear: { icon: Sun, color: '#FFD700' },
  Clouds: { icon: Cloud, color: '#A9A9A9' },
  Rain: { icon: Umbrella, color: '#4682B4' },
  thunderstorm: { icon: CloudLightning, color: '#4B0082' },
  Drizzle: { icon: CloudDrizzle, color: '#778899' },
  Snow: { icon: CloudSnow, color: '#FFFFFF' },
  // 'cloud-sun': { icon: CloudSun, color: '#87CEEB' },
}

export function DayWeather({ data, isSelected, onClick }: any) {
  const { icon: Icon, color } = iconMap[data.weather[0].main as keyof typeof iconMap]
  const date = new Date(data.dt * 1000)

  return (
    <motion.div
      className={`glass cursor-pointer rounded-lg p-4 text-center ${
        isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      onClick={onClick}
    >
      <p className="font-semibold text-weather-text-light dark:text-weather-text-dark">
        {date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
      </p>
      <p className="mb-2 text-sm text-weather-text-light opacity-80 dark:text-weather-text-dark">
        {date.toLocaleDateString('ja-JP', { weekday: 'short' })}
      </p>
      <Icon className="mx-auto my-2 size-12" style={{ color }} />
      <p className="text-sm font-medium">
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
    </motion.div>
  )
}
