import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

const ElegirCatalogo = () => {
  return (
    <Layout>
       <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-y-2 ">
            <div className='md:h-full md:w-1/2 bg-sky-200 flex items-center p-2'>
                <Link
                className="w-full text-center font-bold text-white px-2 py-1 rounded-md bg-sky-400 hover:bg-sky-500"
                href={"/catalogo/hombres"}>Catálogo Masculino</Link>
            </div>
            <div className='md:h-full md:w-1/2 bg-rose-200 flex items-center p-2'>
                <Link
                className="w-full text-center font-bold text-white px-2 whitespace-pre py-1 rounded-md bg-rose-400 hover:bg-rose-500"
                href={"/catalogo/mujeres"}>Catálogo Femenino</Link>
            </div>
        </div>
    </Layout>
  )
}

export default ElegirCatalogo