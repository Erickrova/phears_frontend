import Image from "next/image"
import Link from "next/link"
import useApp from "../hooks/useApp"
import ImageLoading from "../../components/ImageLoading";

const PreviewElementCarrito = ({prenda}) => {
    const {setPrenda,removerDelCarrito} = useApp()
    const [cImage,setCImage] = useState(true)
  return (
    <div className="rounded-md w-full bg-gray-50 flex gap-2 shadow p-2">
    <Link onClick={()=>setPrenda(prenda)} href={`/catalogo/prenda?id=${prenda._id}`} className="flex items-center justify-center mb-2 bg-white w-1/3 ">
        {cImage ? ( <ImageLoading/>): null}
        <Image onLoad={()=> setCImage(false)} className=" w-auto h-auto" src={`${prenda.dir}`} width={100} height={100} quality={50} alt="t-shirt" />
    </Link>
    <div className="w-2/3">
            <p className="font-bold">{prenda.nombre}</p>
            <p className="text-sm text-gray-700">Cantidad Comprar:{prenda.cantidad}</p>
            <p className="text-sm text-gray-700">Precio: ${prenda.precio}</p>
            <button className='w-full text-center py-2 px-2 bg-red-400 hover:bg-red-500 transition-colors text-white font-bold ' onClick={()=>removerDelCarrito(prenda)}>Eliminar Del Carrito</button>
    </div>

</div>
  )
}

export default PreviewElementCarrito