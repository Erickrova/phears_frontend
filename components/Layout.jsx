import Head from 'next/head'
import useAuth from '../hooks/useAuth'
import Header from "./Header"
import ImageLoading from './ImageLoading'

const Layout = ({children}) => {
  const {cargando} = useAuth()
  return (
    cargando ? <ImageLoading /> : (

      <>
      <Head>
      <title>Phears</title>
      <meta name="description" content="clothes ecommerce " />
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='h-screen pt-20 md:pt-14'>
      {children}
      </main>
      </>
      )
  )
}

export default Layout