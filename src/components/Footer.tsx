import useSWR from 'swr'
import React, { useState } from 'react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Footer() {
  const { data, error } = useSWR(
    'https://api.bluelytics.com.ar/v2/latest',
    fetcher,
    { refreshInterval: 60000 }
  )

  const [usdAmount, setUsdAmount] = useState('1')

  // Solo permitir valores numéricos y punto decimal
  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9.]/g, '')
    // Evitar más de un punto decimal
    const parts = val.split('.')
    if (parts.length > 2) {
      val = parts[0] + '.' + parts.slice(1).join('')
    }
    // Permitir vacío
    if (val === '') {
      setUsdAmount('')
    } else if (Number(val) <= 0) {
      setUsdAmount('')
    } else {
      setUsdAmount(val)
    }
  }

  let compra = ''
  let venta = ''
  let promedio = ''
  let compraTotal = ''
  let ventaTotal = ''
  let promedioTotal = ''
  if (data && data.oficial) {
    const compraNum = Number(data.oficial.value_buy)
    const ventaNum = Number(data.oficial.value_sell)
    compra = compraNum.toLocaleString('es-AR', { minimumFractionDigits: 2 })
    venta = ventaNum.toLocaleString('es-AR', { minimumFractionDigits: 2 })
    if (!isNaN(compraNum) && !isNaN(ventaNum)) {
      const avg = (compraNum + ventaNum) / 2
      promedio = avg.toLocaleString('es-AR', { minimumFractionDigits: 2 })
      const amount = parseFloat(usdAmount) || 0
      compraTotal = (compraNum * amount).toLocaleString('es-AR', {
        minimumFractionDigits: 2,
      })
      ventaTotal = (ventaNum * amount).toLocaleString('es-AR', {
        minimumFractionDigits: 2,
      })
      promedioTotal = (avg * amount).toLocaleString('es-AR', {
        minimumFractionDigits: 2,
      })
    }
  }

  return (
    <footer className='relative w-full   flex flex-col items-center gap-5 py-6'>
      <span className='text-black from-zinc-400 dark:from-zinc-900  to-zinc-600 dark:to-zinc-600 text-transparent bg-clip-text bg-gradient-to-tr  pointer-events-none font-bold text-5xl   uppercase '>
        Dólar Oficial
      </span>
      <div className='flex items-center gap-3 flex-col text-zinc-200 z-10 '>
        <div className='flex items-center gap-2 mt-2'>
          <label
            htmlFor='usd-amount'
            className='text-black dark:text-zinc-400 text-sm'
          >
            USD:
          </label>
          <input
            id='usd-amount'
            type='text'
            min='1'
            step='any'
            value={usdAmount}
            onChange={handleUsdChange}
            className='w-20 px-3 py-2 rounded-md  bg-zinc-300 text-black dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-right transition-all placeholder-zinc-400'
            style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              appearance: 'textfield',
            }}
            inputMode='decimal'
            pattern='[0-9.]*'
          />
        </div>
        {error ? (
          <span className='text-black dark:text-zinc-400'>
            No se pudo obtener el valor actual
          </span>
        ) : !compra || !venta ? (
          <span className='text-black dark:text-zinc-500'>Cargando...</span>
        ) : (
          <span className=' font-semibold text-white flex gap-4'>
            <span className='flex-col flex text-center text-black dark:text-zinc-400'>
              Compra
              <span className='text-black dark:text-zinc-300'>
                ${compraTotal}
              </span>
            </span>
            <span className='flex-col text-center flex dark:text-zinc-400 text-black'>
              Venta
              <span className='text-black dark:text-zinc-300'>
                ${ventaTotal}
              </span>
            </span>
          </span>
        )}
      </div>
      {promedio && (
        <div className=' text-black dark:text-zinc-400 font-bold mt-1 flex text-center flex-col'>
          Promedio
          <span className='font-semibold text-black dark:text-white'>
            ${promedioTotal}
          </span>
        </div>
      )}
    </footer>
  )
}
