import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ImageLoading from "../../components/ImageLoading";
import useApp from "../hooks/useApp"

const CardElementCarrito = ({prenda}) => {
  const [cantidad,setCantidad] = useState(0)
  const [cImage,setCImage] = useState(true)

  const {carrito,setPrenda,removerDelCarrito,agregarAlCarrito} = useApp()
    useEffect(()=>{
      if(carrito.length && carrito.some(element => element._id === prenda._id)){
        const elemento = carrito.find(element => element._id === prenda._id)
        setCantidad(elemento.cantidad) 
      }
    },[prenda])
    useEffect(()=>{
      if(cantidad){
        const elemento = {...prenda,cantidad}
        agregarAlCarrito(elemento)
      }
    },[cantidad])
  return (
    <div className="rounded-md w-full md:w-96 bg-gray-50 flex gap-2 shadow p-2">
    <Link onClick={()=>setPrenda(prenda)} href={`/catalogo/prenda?id=${prenda._id}`} className="flex items-center justify-center mb-2 bg-white w-1/3 ">
      {cImage ? ( <ImageLoading/>): null}
      <Image onLoad={()=> setCImage(false)} className=" w-auto h-auto" src={`${prenda.dir}`} width={100} height={100} quality={50} alt="t-shirt" />
    </Link>
    <div className="w-2/3">
            <p className="font-bold">{prenda.nombre}</p>
            <p className="text-sm" >{prenda.descripcion}</p>
            <p className="text-sm text-gray-700">Disponibles:{prenda.disponibles}</p>
            <p className="text-sm text-gray-700">Cantidad Comprar:</p>
            <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="p-2 min-w-0 w-full rounded-md border border-gray-200"
                  />
            <p className="text-sm text-gray-700">Precio: ${prenda.precio}</p>
            <p className="text-sm text-gray-700">Subtotal: ${(prenda.precio * prenda.cantidad)}</p>
            <button className='w-full text-center py-2 px-2 bg-red-400 hover:bg-red-500 transition-colors text-white font-bold ' onClick={()=>removerDelCarrito(prenda)}>Eliminar Del Carrito</button>
    </div>

</div>
  )
}

export default CardElementCarrito