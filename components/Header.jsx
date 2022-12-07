import Link from "next/link"
import { useRouter } from "next/router"
import useApp from "../hooks/useApp"
import useAuth from "../hooks/useAuth"
import CardElementCarrito from "./CardElementCarrito"
import CardGarment from "./CardGarment"
import NavMasculino from "./NavMasculino"
import PreviewElementCarrito from "./PreviewElementCarrito"
const Header = () => {

    const {auth,cargando} = useAuth()
    const {carrito} = useApp()
    const router = useRouter()
    const handleCatalogo = () =>{
        handleCarritoBlur()
        const menu = document.body.querySelector("#menu")
        menu.classList.toggle("hidden")
        menu.classList.toggle("flex")
        menu.classList.toggle("flex-col")
        menu.classList.toggle("py-4")
        menu.classList.toggle("gap-2")
    }
    const handleCatalogoBlur = () =>{
        const menu = document.body.querySelector("#menu")
        setTimeout(()=>{
            menu.classList.add("hidden")
            menu.classList.remove("flex")
            menu.classList.remove("flex-col")
            menu.classList.remove("py-4")
            menu.classList.remove("gap-2")
        },500)
    }
    const handleCarrito = () =>{
        handleCatalogoBlur()
        const carrito = document.body.querySelector("#carrito")
        carrito.classList.toggle("hidden")
        carrito.classList.toggle("flex")
        carrito.classList.toggle("flex-col")
        carrito.classList.toggle("py-4")
        carrito.classList.toggle("gap-2")
    }
    const handleCarritoBlur = ()=>{
        const carrito = document.body.querySelector("#carrito")
        carrito.classList.add("hidden")
        carrito.classList.remove("flex")
        carrito.classList.remove("flex-col")
        carrito.classList.remove("py-4")
        carrito.classList.remove("gap-2")
    }
    const handleResponsiveNav = () =>{
        const nav = document.body.querySelector("#nav")
        nav.classList.toggle("hidden")
    }
  return (
    <header className="p-2 z-20 bg-white fixed min-w-0 w-full flex flex-col md:flex-row justify-between items-center border-b border-gray-800">
        <Link href={"/"} className="text-4xl font-medium hover:text-sky-400 transition-colors" >Phears</Link>
        <div title="desplegar menu" 
            className="cursor-pointer md:hidden w-full flex justify-center items-center"
            onClick={handleResponsiveNav}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
        </div>
        <nav id="nav" className="hidden flex-col md:flex md:flex-row justify-between items-center gap-2 md:pr-4 w-full md:justify-start md:w-auto">
            
            {auth._id ? (
                <Link title="Favoritos" href={"/favoritos"} className="w-full flex items-center justify-center md:justify-start md:w-auto" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                </Link>
            ):null}
            <div
                onClick={handleCarrito}
                className="relative w-full flex items-center justify-center md:justify-start md:w-auto" href={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <div
                id="carrito"
                className="z-10 w-full md:w-64 hidden absolute top-full md:-left-32 bg-white border border-black
                 h-fit md:justify-start
                "
                
                >
                    <div className="relative">
                        <div className="w-full h-64 pb-6 overflow-y-auto overflow-x-hidden">
                            {carrito.length ? carrito.map(prenda =>(
                                <PreviewElementCarrito key={prenda._id} prenda={prenda} />
                            )):<p className="text-xl font-bold text-center">No hay elementos en el carrito</p>}
                        </div>
                    </div>
                        <Link 
                            href={"/carrito"}
                            className="w-full text-center py-2 px-2 bg-sky-400 hover:bg-sky-500 transition-colors text-white font-bold "
                        >
                            Ir al Carrito
                        </Link>
                </div>
             </div>
            <button
            type="button"
            onClick={handleCatalogo}
            onBlur={handleCatalogoBlur}
             className="relative w-full flex items-center justify-center" href={"/"}>
                <p className={`w-full md:text-xl hover:text-sky-500 ${router.pathname.includes("/catalogo") ? "text-sky-500":""}`}>
                    Catálogo
                </p>
                <div id="menu" className="hidden absolute z-10 top-full w-full bg-white border border-black">
                    <Link className="text-sm  hover:text-sky-500 underline w-full hover:bg-gray-50" href={"/catalogo/mujeres"}>Mujer</Link>
                    <Link className="text-sm hover:text-sky-500 underline w-full hover:bg-gray-50" href={"/catalogo/hombres"}>Hombre</Link>
                    
                </div>
             </button>
            <Link
            className={`w-full whitespace-pre flex items-center justify-center md:text-xl hover:text-sky-500 ${router.pathname.includes("/sobre-nosotros") ? "text-sky-500":""}`}
             href={"/sobre-nosotros"}>Sobre Nosotros</Link>
            {auth?._id ? (
                <Link
                title="perfil"
                href={"/perfil"}
                className="w-full flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </Link>
            ):(
                <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center ">
                    <Link
                    className="w-full text-center font-bold text-white px-2 py-1 rounded-md bg-green-400 hover:bg-green-500"
                    href={"/registro"}>Registrarse</Link>
                    <Link
                    className="w-full text-center font-bold text-white px-2 whitespace-pre py-1 rounded-md bg-sky-400 hover:bg-sky-500"
                    href={"/login"}>Iniciar Sesión</Link>
                </div>
            ) }
            {auth?.rank > 0 ? (
                <Link
                className="w-full flex items-center justify-center md:text-xl hover:text-sky-500"
                 href={"/admin"}>Admin</Link>
            ):null}
        </nav>
    </header>
  )
}

export default Header