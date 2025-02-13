import { motion } from 'framer-motion'
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudSnow, CloudSun, Sun, Umbrella } from 'lucide-react'

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

interface DayWeatherProps {
  data: any
  isSelected: boolean
  onClick: () => void
}

export function DayWeather({ data, isSelected, onClick }: DayWeatherProps) {
  const weatherMain = data.weather[0].main as string
  const weatherConfig = iconMap[weatherMain] || iconMap.Clouds
  const { icon: Icon, color } = weatherConfig
  const date = new Date(data.dt * 1000)

  return (
    <motion.div
      className={`glass cursor-pointer rounded-lg p-4 text-center transition-all hover:scale-105 ${
        isSelected ? 'scale-105 !ring-2 !ring-blue-700 dark:!ring-blue-200' : ''
      }`}
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
        {' '}
        <span className="text-blue-500 dark:text-blue-400">
          {Math.round(data.temp.min)}
          °
        </span>
      </p>
    </motion.div>
  )
}
