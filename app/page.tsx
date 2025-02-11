import { Form } from '~/components/Form'
import { ThemeToggle } from '~/components/ThemeToggle'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-200 px-4 py-8 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="glass container mx-auto rounded-[21px] p-6 sm:p-8">

        <div className="mb-6 flex items-center justify-center sm:mb-8">
          <h1 className="text-3xl font-bold text-weather-text-light dark:text-weather-text-dark sm:text-4xl">
            天気予報
          </h1>
          <div className="absolute right-0 top-0">
            {/* <ThemeToggle /> */}
          </div>
        </div>
        <Form />
      </div>
    </div>

  )
}
