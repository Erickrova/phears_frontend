import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ImageLoading from "../../components/ImageLoading";
import Layout from "../../components/Layout";
import useApp from "../../hooks/useApp";
import useAuth from "../../hooks/useAuth";

const Prenda = () => {
  const [cargando,setCargando] = useState(true)
  const [cImage,setCImage] = useState(true)
  const [cantidad, setCantidad] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [encarrito, setEncarrito] = useState(false);
  const {prenda,setPrenda,agregarFavorito,removerFavorito,favoritos,agregarAlCarrito,carrito} = useApp()
  const {auth} = useAuth()
  const router = useRouter()
  const {id} = router.query
  const handleFavorito = async () =>{
    if(favorite){
      await removerFavorito(prenda)
      setFavorite(false)
    }else{
      await agregarFavorito(prenda)
      setFavorite(true)
    }
  }

  const handleAgregarCarrito = () =>{
    if(cantidad >= 1){
      const elemento = {...prenda,cantidad}
      agregarAlCarrito(elemento)
    }else{
      alert("no puedes agregar 0 cantidades de un producto al carrito")
    }
  }
  const handlePagar = () =>{
    if(cantidad >= 1){
      const elemento = {...prenda,cantidad}
      agregarAlCarrito(elemento)
      router.push("/carrito")
    }else{
      alert("no puedes agregar 0 cantidades de un producto al carrito")
    }
  }

  useEffect(()=>{
    try {
      const llamado = async () =>{
        if(id){
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clothes/obtener-clothe/${id}`
          const response = await fetch(url)
          const data = await response.json()
          setPrenda(data)
          setCargando(false)
        }
      }
      llamado()
    } catch (error) {
      console.log(error)
      setCargando(false)
    }
  },[id])

  useEffect(()=>{
    if(carrito.length && carrito.some(element => element._id === prenda._id)){
      const elemento = carrito.find(element => element._id === prenda._id)
      setCantidad(elemento.cantidad) 
    }
  },[prenda])

  useEffect(()=>{
    if(favoritos?.some(favorito => favorito._id == prenda._id)){
      setFavorite(true)
    }
  },[])
  useEffect(()=>{
    if(carrito.some(element => element._id === prenda._id)){
      setEncarrito(true)
    }else{
      setEncarrito(false)
    }
  },[carrito,prenda])
  return (
    cargando ? <ImageLoading /> :
    prenda?._id ? (
      <Layout>
      <div className="w-full md:w-2/3 md:mx-auto mt-10 pb-10">
        <div className="rounded-md bg-gray-50 shadow p-2 w-full md:mx-auto">
          <div
            className="w-full h-full flex items-center justify-center mb-2 bg-white"
            >
              {cImage ? ( <ImageLoading/>): null}
            <Image
              src={`${prenda.dir}`}
              width={500}
              height={700}
              quality={100}
              className=""
              alt="t-shirt"
              priority
              onLoad={()=> setCImage(false)}
              />
          </div>
          <div className="flex">
            <div className=" w-11/12">
              <p className="font-bold">{prenda.nombre}</p>
              <p className=" whitespace-pre-line text-sm">
                {prenda.descripcion}
              </p>
              <p className="text-sm text-gray-700">
                Disponibles:{prenda.disponibles}
              </p>
              <p className="text-sm text-gray-700">Precio: ${prenda.precio}</p>
              <div>
                <label className=" uppercase text-gray-700 pr-2">
                  Cantidad a comprar:
                </label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="p-2 min-w-0 w-full rounded-md border border-gray-200"
                  />
              </div>
            </div>
            {auth?._id ? (
              
              <button
              className="flex items-start"
              onClick={handleFavorito}
              >
              {favorite ? (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                    />
                </svg>
              ) : (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                </svg>
              )}
            </button>
            ):null}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly p-2 gap-2">
          <button
            onClick={handleAgregarCarrito}
            className={`${encarrito ? " bg-sky-500 hover:bg-sky-600" : " bg-amber-500 hover:bg-amber-600"} px-2 py-1 transition-colors rounded-md font-bold md:w-2/3 text-white`}>
              {encarrito ? "Actualizar Carrito" : "Agregar Al Carrito"}
          </button>
          <button
            onClick={handlePagar}
            className="px-2 py-1 bg-green-500 hover:bg-green-600 transition-colors rounded-md font-bold md:w-1/3 text-white ">
            Comprar
          </button>
        </div>
        <div className="">
          <h3 className="text-2xl font-bold">Métodos de Pago:</h3>
          <div className="flex flex-wrap gap-4 border border-gray-600 rounded-lg p-2">

          <div className="bg-gray-50 p-2 flex flex-col items-center">
            <p className="text-xl font-bold">Tarjetas de crédito o debito</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <div className="bg-gray-50 p-2 flex flex-col items-center">
            <p className="text-xl font-bold">Paypal</p>
            <svg xmlns="http://www.w3.org/2000/svg" className=" h-14 w-14 icon icon-tabler icon-tabler-brand-paypal" width="100" height="100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00abfb" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 13l2.5 0c2.5 0 5 -2.5 5 -5c0 -3 -1.9 -5 -5 -5h-5.5c-.5 0 -1 .5 -1 1l-2 14c0 .5 .5 1 1 1h2.8l1.2 -5c.1 -.6 .4 -1 1 -1zm7.5 -5.8c1.7 1 2.5 2.8 2.5 4.8c0 2.5 -2.5 4.5 -5 4.5h-2.6l-.6 3.6a1 1 0 0 1 -1 .8l-2.7 0a0.5 .5 0 0 1 -.5 -.6l.2 -1.4" />
            </svg>
          </div>
          <div className="bg-gray-50 p-2 flex flex-col items-center">
            <p className="text-xl font-bold">Crypto Monedas</p>
            <svg xmlns="http://www.w3.org/2000/svg" className=" h-16 w-16 icon icon-tabler icon-tabler-currency-bitcoin" width="100" height="100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffbf00" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M6 6h8a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-8" />
            <line x1="8" y1="6" x2="8" y2="18" />
            <line x1="8" y1="12" x2="14" y2="12" />
            <line x1="9" y1="3" x2="9" y2="6" />
            <line x1="13" y1="3" x2="13" y2="6" />
            <line x1="9" y1="18" x2="9" y2="21" />
            <line x1="13" y1="18" x2="13" y2="21" />
            </svg>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  ):(
    <Layout>
      <p className="text-center text-xl font-bold">Prenda no encontrada</p>
    </Layout>
    )
    
  );
};

export default Prenda;
