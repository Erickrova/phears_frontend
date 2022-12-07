import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import useApp from '../hooks/useApp'
import useAuth from '../hooks/useAuth'
import {useRouter} from "next/router"


const perfil = () => {
    const {auth,cerrarSesionAuth} = useAuth()
    const {cerrarSesionApp} = useApp()
    const router = useRouter()
    
    const handleCerrarSesion = () =>{
      cerrarSesionApp()
      cerrarSesionAuth()
      router.push("/")
    }
  return (
    <Layout>
    {auth?._id ? (
      
      <div className='w-full md:w-2/3 mx-auto flex flex-col items-center justify-center h-full'>
          <div>
            <p className='capitalize text-xl'>Nombre: {auth.nombre}</p>
            <p>Email: {auth.email}</p>
            {auth.rank > 0 ? (
              <p className='mb-2'>Rango: {auth.rank}</p>
            ):null}
            <button className='w-full text-center py-2 px-2 bg-red-400 hover:bg-red-500 transition-colors text-white font-bold ' onClick={handleCerrarSesion}>Cerrar Sesion</button>
          </div>
        </div>
      ) : null}
    </Layout>
  )
}

export default perfil