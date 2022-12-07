import React from 'react'
import Layout from '../components/Layout'

const Sobrenosotros = () => {
  return (
    <Layout>
        <div className='w-full px-2 md:w-2/3 mx-auto pt-10'>
            <h1 className='text-center text-4xl font-medium'>Phears Company</h1>
            <p className='text-2xl text-center mt-10'>Empresa dedicada a la venda de prendas de vestir
                de colección, con los mejores diseñadores y precios. ubicada en colombia con envios a todo el mundo. <br />
                Creada el 25 de noviembre del 2022 por 
                <span className='text-sky-400 uppercase'> erick romaña</span>
            </p>
        </div>
    </Layout>
  )
}

export default Sobrenosotros