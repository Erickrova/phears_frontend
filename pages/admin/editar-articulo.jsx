import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AdminLayout from "../../components/admin/AdminLayout"
import Alerta from "../../components/Alerta"

const EditarArticulo = ({clothe}) => {
    const [nombre,setNombre] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [dir,setDir] = useState("")
    const [categoria,setCategoria] = useState("")
    const [disponibles,setDisponibles] = useState(0)
    const [precio,setPrecio] = useState(0)
    const [alerta,setAlerta] = useState({})

    const router = useRouter()

    const open = (e) =>{
        e.preventDefault()
        const imagen = document.querySelector('#image');
        let widget_cloudinary = cloudinary.createUploadWidget({
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
            uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
            sources: [
                "local",
                "url",
                "camera",
                "image_search",
                "google_drive",
              ],
            multiple: false,
        }, (err, result) => {
            if (!err && result && result.event === 'success') {
                // console.log('Imagen subida con éxito', result.info);
                imagen.src = result.info.secure_url;
                setDir(imagen.src)
            }
        });
        widget_cloudinary.open();
      }
    useEffect(()=>{
        setNombre(clothe.nombre)
        setDescripcion(clothe.descripcion)
        setDir(clothe.dir)
        setCategoria(clothe.categoria)
        setDisponibles(clothe.disponibles)
        setPrecio(clothe.precio)
    },[clothe])
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if([nombre,descripcion,dir,categoria,disponibles,precio].includes("")){
            alert("Todos los campos son obligatorios")
            return
        }
        const token = localStorage.getItem("token")
        if(!token) return
        const data = {
            nombre,
            descripcion,
            dir,
            categoria,
            disponibles,
            precio
        }
        const config = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
        if(token){
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clothes/actualizar/${clothe._id}`
                fetch(url,config).then(res => res.json()).then(dat => console.log(dat))
                setAlerta({mensaje:"Prenda Actualizada Correctamente, Redireccionando...",error:false})
                setNombre("")
                setCategoria("")
                setDescripcion("")
                setDir("")
                setPrecio(0)
                setDisponibles(0)
                setTimeout(()=>{
                    setAlerta({})
                    router.push("/admin")
                },3000)
            } catch (error) {
                setAlerta({mensaje:"Hubo un error al actualizar la publicación",error:true})
                console.log(error)
            }
        }
    }
    const {mensaje} = alerta

  return (

        <AdminLayout>
            {clothe?._id ? (

                <form className="md:w-2/3 mx-auto p-4 mt-10 rounded-md shadow-xl"
                onSubmit={handleSubmit}
            >
            <legend className="text-center text-2xl font-bold">Editar Clothe</legend>
            {mensaje ? <Alerta alerta={alerta} /> : null}
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="nombre">Nombre</label>
                <input 
                value={nombre}
                onChange={e=> setNombre(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="text" id="nombre" placeholder="Nombre aqui" />
            </div>
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="descripcion">Descripcion</label>
                <input
                value={descripcion}
                onChange={e=> setDescripcion(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="text" id="descripcion" placeholder="Descripcion aqui" />
            </div>
            <div className="py-2">
                <Image id="image" src={`${dir ? dir : "/img/placeholder.jpg"}`} width="400" height={"400"} alt="imagen" />
                <button className="w-full p-2 text-center font-bold text-white bg-sky-400 hover:bg-sky-500 transition-colors" onClick={open} >Subir Imagen</button>
            </div>
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="categoria">Categoria</label>
                <select value={categoria}
                onChange={e=> setCategoria(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="text" id="dir" >
                    <option value="" disabled >--Selecciona una categoria--</option>
                    <option value="Masculino/Camiseta"  >Masculino/Camiseta</option>
                    <option value="Masculino/Pantalon"  >Masculino/Pantalon</option>
                    <option value="Masculino/Zapatos"  >Masculino/Zapatos</option>
                    <option value="Masculino/Accesorios"  >Masculino/Accesorios</option>
                    <option value="Femenino/Blusa"  >Femenino/Blusa</option>
                    <option value="Femenino/Pantalon"  >Femenino/Pantalon</option>
                    <option value="Femenino/Zapatos"  >Femenino/Zapatos</option>
                    <option value="Femenino/Accesorios"  >Femenino/Accesorios</option>
                </select>
                <input 
                 />
            </div>
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="disponibles">Disponibles</label>
                <input 
                value={disponibles}
                onChange={e=> setDisponibles(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="Number" id="disponibles"  />
            </div>

            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="precio">Precio</label>
                <input 
                value={precio}
                onChange={e=> setPrecio(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="Number" id="precio"  />
            </div>
            <input className="w-full text-center cursor-pointer font-bold text-white px-2 py-1 rounded-md bg-sky-400 hover:bg-sky-500" type="submit" value="Actualizar" />
        </form>
            ): <p className="text-2xl font-bold text-center">Prenda no encontrada</p>}
    </AdminLayout>
  )
}
export async function getServerSideProps({query}) {
    const {id} = query
    const url = `${process.env.BACKEND_URL}/api/clothes/obtener-clothe/${id}`
    const response = await fetch(url)
    const data = await response.json()
return {
props: {
  clothe:data
},
}
}

export default EditarArticulo