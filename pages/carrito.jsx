import { useEffect, useState } from 'react'
import CardElementCarrito from '../components/CardElementCarrito'
import CardGarment from '../components/CardGarment'
import FormCrypto from '../components/FormCrypto'
import FormPaypal from '../components/FormPaypal'
import FormTarjeta from '../components/FormTarjeta'
import Layout from '../components/Layout'
import useApp from '../hooks/useApp'
import Alerta from '../components/Alerta'

const Carrito = () => {

  const [totalPagar,setTotalPagar] = useState(0)
  const [totalArticulos,setTotalArticulos] = useState(0)
  const [metodoPago,setMetodoPago] = useState("")
  const {carrito} = useApp()

  useEffect(()=>{
    if(carrito?.length){
      const total = carrito.reduce((total,actual)=>{
        const subtotal = Number(actual.precio) * Number(actual.cantidad)
        return Number(total) + Number(subtotal)
      },0)
      const totalArt = carrito.reduce((totalArts,actual)=>{
        return Number(totalArts) + Number(actual.cantidad)
      },0)
      setTotalPagar(total)
      setTotalArticulos(totalArt)
    }
  },[carrito])

  return (
    
    <Layout>
        {carrito.length ? (
          <>
        <h1 className='text-2xl text-center font-bold py-4'>Tu Carrito</h1>
        {}
        <div className='pb-10 md:h-full flex flex-col justify-center items-center md:flex-row-reverse gap-4 md:w-2/3 md:mx-auto'>
            <div className=''>
              <div className='bg-red-100 p-4 rounded-md'>
                  <h2 className='text-xl font-bold'>Resumen</h2>
                  <p>Total a Articulos: {totalArticulos}</p>
                  <p>Total a pagar: ${totalPagar}</p>
                  <select className='p-2 rounded-md bg-white' value={metodoPago} onChange={e=> setMetodoPago(e.target.value)} >
                    <option value="">Seleccione metodo de pago</option>
                    <option value="paypal">* paypal</option>
                    <option value="debito o credito">* debito o crédito</option>
                    <option value="crypto">* crypto</option>
                  </select>
              </div>
              <div className='p-2'>
              <div className='flex flex-col md:flex-row gap-2 bg-red-600 rounded-md p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mx-auto stroke-white w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className=' text-white'> No pongas tus datos reales, es solo una simulación de pago</p>
              </div>
              {metodoPago == "paypal" ? (
                <FormPaypal />
                ) : metodoPago == "debito o credito" ? (
                  <FormTarjeta />
                  ): metodoPago == "crypto" ? (
                    <FormCrypto />
                    ): null
                  }
              </div>
            </div>
            <div className='aparecer mb-10 md:h-full md:overflow-y-scroll flex flex-wrap justify-center items-center gap-4 mt-10 md:mt-20 pb-10'>
              {carrito?.length ? carrito.map(clothe =>(
                <CardElementCarrito key={clothe._id} prenda={clothe} />
                )):null}
          </div>
        </div>
        </>
    ) : <p className="py-4 text-xl font-bold text-center">No hay elementos en el carrito</p>}
    </Layout>
    
  )
}

export default Carrito