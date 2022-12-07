import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className='aparecer h-full w-full flex flex-col justify-center items-center pt-20'>
        <h1 className='text-8xl text-center capitalize font-bold mb-2'>Las {" "}
        <span className='text-sky-500 animate-pulse'>
         mejores
        </span>
        {" "}
          prendas a los mejores  {" "}
        <span className='text-sky-500 animate-pulse'>
         precios
        </span></h1>
        <Link
          href="/elegir-catalogo"
          className='flex items-center decoration animate-pulse pb-10'
        >
          <p className='text-xl text-sky-500 underline'>
            Revisa nuestro catálogo
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-sky-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>

        </Link>
      </div>
    </Layout>
  )
}
