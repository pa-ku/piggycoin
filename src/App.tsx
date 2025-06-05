import logo from './assets/piggycoin.png'
import ConverterCard from './components/ConverterCard'
import Footer from './components/Footer'

function App() {
 


  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center p-4 text-zinc-900 dark:text-zinc-100'>
      <div className='flex items-center gap-2 mb-8 flex-col'>
        <img
          className='size-20 hover:scale-110 duration-300 cursor-pointer'
          src={logo}
          alt=''
       
        />
        {/* Remove the audios */}
      </div>
      <ConverterCard />

      <p className='mt-8 text-sm text-zinc-500 dark:text-zinc-400 text-center'>
        Exchange rates are updated in real-time from official sources
      </p>

      <Footer />
    </div>
  )
}

export default App
