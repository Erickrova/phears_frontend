import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import Header from '../Header'
import NavAdmin from './NavAdmin'

const AdminLayout = ({children}) => {
    const {cargando,auth} = useAuth()
    const router = useRouter()
    
    useEffect(()=>{
        if(auth.rank == 0){
            router.push("/")
        }
    },[auth])
    return (
      cargando ? <p>cargando..</p> : auth?.rank > 0 ? (
        <>
        <Head>
        <title>Phears</title>
        <meta name="description" content="clothes ecommerce " />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className='h-screen pt-20 md:pt-16  flex overflow-hidden'>
        <NavAdmin />
        <div className='w-full h-full overflow-y-auto md:mt-1 md:pt-1'>
            {children}
        </div>
        </main>
        </>
        ):null
    )
}

export default AdminLayout