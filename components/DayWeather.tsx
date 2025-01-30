import type { WeatherData } from '../types/weather'
import { motion } from 'framer-motion'
import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react'

interface DayWeatherProps {
  data: WeatherData
  isSelected: boolean
  onClick: () => void
}

const iconMap = {
  'sun': { icon: Sun, color: '#FFD700' },
  'cloud': { icon: Cloud, color: '#A9A9A9' },
  'cloud-sun': { icon: CloudSun, color: '#87CEEB' },
  'cloud-rain': { icon: CloudRain, color: '#4682B4' },
}

export function DayWeather({ data, isSelected, onClick }: DayWeatherProps) {
  const { icon: Icon, color } = iconMap[data.icon as keyof typeof iconMap]
  const date = new Date(data.date)

  return (
    <motion.div
      className={`glass cursor-pointer rounded-lg p-4 text-center ${
        isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <p className="text-weather-text-light dark:text-weather-text-dark font-semibold">
        {date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
      </p>
      <p className="text-weather-text-light dark:text-weather-text-dark mb-2 text-sm opacity-80">
        {date.toLocaleDateString('ja-JP', { weekday: 'short' })}
      </p>
      <Icon className="mx-auto my-2 size-12" style={{ color }} />
      <p className="text-sm font-medium">
        <span className="text-red-500 dark:text-red-400">
          {data.highTemp}
          °
        </span>
        {' '}
        /
        <span className="text-blue-500 dark:text-blue-400">
          {data.lowTemp}
          °
        </span>
      </p>
    </motion.div>
  )
}
