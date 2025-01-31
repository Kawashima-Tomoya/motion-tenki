export interface WeatherData {
  date: string
  icon: string
  highTemp: number
  lowTemp: number
  description: string
  humidity: number
  windSpeed: number
}

export const mockWeatherData: WeatherData[] = [
  {
    date: '2023-05-22',
    icon: 'sun',
    highTemp: 25,
    lowTemp: 15,
    description: '晴れ',
    humidity: 45,
    windSpeed: 10,
  },
  {
    date: '2023-05-23',
    icon: 'cloud-sun',
    highTemp: 23,
    lowTemp: 14,
    description: '晴れ時々曇り',
    humidity: 50,
    windSpeed: 12,
  },
  {
    date: '2023-05-24',
    icon: 'cloud',
    highTemp: 22,
    lowTemp: 13,
    description: '曇り',
    humidity: 60,
    windSpeed: 8,
  },
  {
    date: '2023-05-25',
    icon: 'cloud-rain',
    highTemp: 20,
    lowTemp: 12,
    description: '雨',
    humidity: 75,
    windSpeed: 15,
  },
  {
    date: '2023-05-26',
    icon: 'cloud-sun',
    highTemp: 21,
    lowTemp: 13,
    description: '晴れ時々曇り',
    humidity: 55,
    windSpeed: 11,
  },
  {
    date: '2023-05-27',
    icon: 'sun',
    highTemp: 24,
    lowTemp: 14,
    description: '晴れ',
    humidity: 48,
    windSpeed: 9,
  },
  {
    date: '2023-05-28',
    icon: 'cloud',
    highTemp: 22,
    lowTemp: 13,
    description: '曇り',
    humidity: 58,
    windSpeed: 10,
  },
]
