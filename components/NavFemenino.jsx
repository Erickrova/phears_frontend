import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const  NavFemenino= () => {
  const router = useRouter()
  const handleResponsiveNav = () =>{
    const nav = document.body.querySelector("#navfem")
    nav.classList.toggle("hidden")
    nav.classList.toggle("flex")
  }
  return (
    <div className='w-full md:w-fit border border-gray-800 flex flex-col md:flex md:flex-row justify-between items-center gap-2 md:pr-4 mx-auto px-2 py-1 mb-4'>
        <h2 
        onClick={handleResponsiveNav}
        className='w-full flex justify-center items-center gap-2 cursor-pointer md:cursor-default md:pr-4 font-bold'>Catálogo Femenino
          <span className='md:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          </span>
        </h2>
        <nav id="navfem" className='hidden flex-col md:flex md:flex-row justify-between items-center gap-2 md:pr-4 w-full md:justify-start md:w-auto'>
            <Link className={`${router.pathname == "/catalogo/mujeres" ? "text-sky-500" : ""} hover:text-sky-500  w-full text-center hover:bg-gray-50`} href={"/catalogo/mujeres"} >Blusas</Link>
            <Link className={`${router.pathname == "/catalogo/mujeres/pantalones" ? "text-sky-500" : ""} hover:text-sky-500  w-full text-center hover:bg-gray-50`} href={"/catalogo/mujeres/pantalones"} >Pantalones</Link>
            <Link className={`${router.pathname == "/catalogo/mujeres/zapatos" ? "text-sky-500" : ""} hover:text-sky-500  w-full text-center hover:bg-gray-50`} href={"/catalogo/mujeres/zapatos"} >Zapatos</Link>
            <Link className={`${router.pathname == "/catalogo/mujeres/accesorios" ? "text-sky-500" : ""} hover:text-sky-500  w-full text-center hover:bg-gray-50`} href={"/catalogo/mujeres/accesorios"} >Accesorios</Link>
        </nav>
    </div>
  )
}

export default NavFemenino