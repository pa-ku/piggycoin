import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Footer() {
  const { data, error } = useSWR(
    'https://api.bluelytics.com.ar/v2/latest',
    fetcher,
    { refreshInterval: 60000 }
  )

  let compra = ''
  let venta = ''
  let promedio = ''
  if (data && data.oficial) {
    const compraNum = Number(data.oficial.value_buy)
    const ventaNum = Number(data.oficial.value_sell)
    compra = compraNum.toLocaleString('es-AR', { minimumFractionDigits: 2 })
    venta = ventaNum.toLocaleString('es-AR', { minimumFractionDigits: 2 })
    if (!isNaN(compraNum) && !isNaN(ventaNum)) {
      const avg = (compraNum + ventaNum) / 2
      promedio = avg.toLocaleString('es-AR', { minimumFractionDigits: 2 })
    }
  }

  return (
    <footer className='w-full mt-12 flex flex-col items-center gap-2 py-6'>
      <div className='flex items-center gap-2 flex-col text-zinc-200 '>
        <span className='text-zinc-300 font-bold text-lg'>Dólar Oficial</span>
        {error ? (
          <span className='text-zinc-400'>
            No se pudo obtener el valor actual
          </span>
        ) : !compra || !venta ? (
          <span className='text-zinc-500'>Cargando...</span>
        ) : (
          <span className='font-semibold text-white flex gap-4'>
            <span>
              Compra <span className='text-zinc-300'>${compra}</span>
            </span>
            <span>
              Venta <span className='text-zinc-300'>${venta}</span>
            </span>
          </span>
        )}
      </div>
      {promedio && (
        <div className=' text-zinc-400 mt-1'>
          Promedio:{' '}
          <span className='font-semibold text-white'>${promedio}</span>
        </div>
      )}
    </footer>
  )
}
