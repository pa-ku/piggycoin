import logo from './assets/piggycoin.png'
import ConverterCard from './components/ConverterCard'
import Footer from './components/Footer'
import React, { useState } from 'react'

function App() {
  // Set dark as the default theme
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`app ${theme}`}>
      <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center p-4 text-zinc-900 dark:text-zinc-100'>
        <div className='flex items-center gap-2 mb-8 flex-col'>
          <img
            className='size-20 invert dark:invert-0 hover:scale-105 duration-300 cursor-pointer'
            src={logo}
            alt=''
            onClick={toggleTheme}
          />
        </div>
        <ConverterCard />
        <p className='mt-8 text-sm text-zinc-500 dark:text-zinc-400 text-center'>
          Exchange rates are updated in real-time from official sources
        </p>
        <Footer />
      </div>
    </div>
  )
}

export default App
