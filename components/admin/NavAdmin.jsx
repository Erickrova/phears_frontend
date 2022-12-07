import Link from 'next/link'
import React from 'react'

const NavAdmin = () => {
  return (
    <div className='md:h-full bg-indigo-600 md:w-1/6 p-2 md:pt-3'>
        <Link href={"/admin"} className='text-2xl font-bold text-white hover:text-sky-400'>Phears Admin</Link>
        <nav className='md:h-full flex flex-col'>
            <Link href={"/admin/subir-articulo"} className="text-md text-white font-medium py-1 hover:text-sky-400">Subir Articulo</Link>
            <Link href={"/admin"} className="text-md text-white font-medium py-1 hover:text-sky-400">Catálogo</Link>
        </nav>
    </div>
  )
}

export default NavAdmin