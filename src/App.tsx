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
    <div className={`animate-fade-in app ${theme}`}>
      <div className='min-h-screen bg-zinc-100 dark:bg-zinc-900 flex flex-col items-center justify-center p-4 gap-8 text-zinc-900 dark:text-zinc-100'>
        <div className='flex items-center gap-2 flex-col'>
          <img
            className='size-24 invert dark:invert-0 hover:scale-105 duration-300 cursor-pointer'
            src={logo}
            alt=''
            onClick={toggleTheme}
          />
        </div>
        <ConverterCard />

        <Footer />
      </div>
    </div>
  )
}

export default App
