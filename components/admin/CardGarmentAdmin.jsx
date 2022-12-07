import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import useApp from "../../hooks/useApp"
import useAuth from "../../hooks/useAuth"
import ImageLoading from "../../components/ImageLoading";

const CardGarmentAdmin = ({prenda}) => {
  const [favorite,setFavorite] = useState(false)
  const [cImage,setCImage] = useState(true)

  const {setPrenda,agregarFavorito,removerFavorito,favoritos} = useApp()
  const {auth} = useAuth()

  const handleFavorito = async () =>{
    if(favorite){
      await removerFavorito(prenda)
      setFavorite(false)
    }else{
      await agregarFavorito(prenda)
      setFavorite(true)
    }
  }
  const handleEliminarArticulo = async ()=>{
    if(confirm("¿deseas eliminar este articulo?")){
      const token = localStorage.getItem("token")
      if(!token) return
      const config = {
          method:"DELETE",
          headers:{
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          },
      }
      if(token){
          try {
              const url = `http://localhost:4000/api/clothes/eliminar/${prenda._id}`
              fetch(url,config).then(res => res.json()).then(dat => console.log(dat))
          } catch (error) {
              console.log(error)
          }
      }
    }
  }

  useEffect(()=>{
    if(favoritos?.some(favorito => favorito._id == prenda._id)){
      setFavorite(true)
    }
  },[])
  return (
    <div className="rounded-md w-60 bg-gray-50 shadow p-2">
        <Link onClick={()=>setPrenda(prenda)} href={`/catalogo/prenda?id=${prenda._id}`} className="flex items-center justify-center mb-2 bg-white">
          {cImage ? ( <ImageLoading/>): null}
          <Image onLoad={()=> setCImage(false)} className=" w-auto h-auto" src={`${prenda.dir}`} width={200} height={400} quality={50} alt="t-shirt" />
        </Link>
        <div className="flex">
            <div className=" w-11/12">
                <p className="font-bold">{prenda.nombre}</p>
                <p className=" whitespace-nowrap overflow-hidden overflow-ellipsis text-sm" >{prenda.descripcion}</p>
                <p className="text-sm text-gray-700">Disponibles:{prenda.disponibles}</p>
                <p className="text-sm text-gray-700">Precio: ${prenda.precio}</p>
            </div>
            {auth?._id ? (

              <button
              className="flex items-start"
              onClick={handleFavorito}
              >
                {favorite ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  

                ):(
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    )}
                    </button>
            ):null}
        </div>
        <div className="flex flex-col md:flex-row gap-2">
            <Link href={`/admin/editar-articulo?id=${prenda._id}`} className="w-full px-2 py-1 bg-sky-500 text-white text-center font-bold hover:bg-sky-700 transition-colors">Editar</Link>
            <button onClick={handleEliminarArticulo} className="w-full px-2 py-1 bg-red-500 text-white text-center font-bold hover:bg-red-700 transition-colors">Eliminar</button>
        </div>

    </div>
  )
}

export default CardGarmentAdmin