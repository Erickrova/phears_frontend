import {createContext, useEffect, useState} from "react"
import useAuth from "../hooks/useAuth"
import {useRouter} from "next/router"

const AppContext = createContext()

const AppProvider = ({children}) => {

  const [carrito,setCarrito] = useState([])
  const [favoritos,setFavoritos] = useState([])
  const [factura,setFactura] = useState({})
  const [prenda,setPrenda] = useState({})


  const {auth} = useAuth()
  const router = useRouter() 

  const cerrarSesionApp = () =>{
    setCarrito([])
    setFavoritos([])
    localStorage.removeItem("carritophears")
  }

  const agregarAlCarrito = (elemento) =>{
    if(carrito.some(element => element._id === elemento._id)){
      const carritoModificar = [...carrito]
      const elementoCarrito = carrito.find(element => element._id === elemento._id)
      carritoModificar.splice(carritoModificar.indexOf(elementoCarrito),1,elemento)
      setCarrito(carritoModificar)
      localStorage.setItem("carritophears",JSON.stringify(carritoModificar))
    }else{
      const carritoActualizar = [...carrito]
      const carritoActualizado = [...carritoActualizar,elemento]
      setCarrito(carritoActualizado) 
      localStorage.setItem("carritophears",JSON.stringify(carritoActualizado))
    }
    
  }
  const removerDelCarrito = (elemento) =>{
    const carritoActualizar = [...carrito]
    const carritoActualizado = carritoActualizar.filter(element => element._id !== elemento._id)
    setCarrito(carritoActualizado) 
    localStorage.setItem("carritophears",JSON.stringify(carritoActualizado))
  }
  
  const agregarFavorito = async (elemento) =>{
    const favoritosActualizar = [...favoritos]
    const favoritosActualizado = [...favoritosActualizar,elemento]
    setFavoritos(favoritosActualizado)
    const token = localStorage.getItem("token")
    if(!token) {
        return
    }
    const config = {
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    if(token){
        try {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuarios/favoritos/${elemento._id}/${auth._id}`
            fetch(url,config).then(res => res.json()).then(dat => console.log(dat))
        } catch (error) {
            console.log(error)
        }
    }
  }
  const removerFavorito = async (elemento) => {
      const favoritosActualizar = [...favoritos]
      const favoritosActualizado = favoritosActualizar.filter(prenda => prenda._id !== elemento._id)
      setFavoritos(favoritosActualizado)
      const token = localStorage.getItem("token")
      if(!token) {
          return
      }
      const config = {
          headers:{
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`
          }
      }
      if(token){
          try {
              const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuarios/remover-favoritos/${elemento._id}/${auth._id}`
              fetch(url,config).then(res => res.json()).then(dat => console.log(dat))
          } catch (error) {
              console.log(error)
          }
        }
  }
  
  const handleFactura = (methodPago,nombre,datos) =>{
    if(carrito.some(element => element.cantidad > element.disponibles)){
      alert("no puedes comprar mas articulos de los disponibles")
      return
    }
    const total = carrito.reduce((total,actual)=>{
      const subtotal = Number(actual.precio) * Number(actual.cantidad)
      return Number(total) + Number(subtotal)
    },0)
    const totalArt = carrito.reduce((totalArts,actual)=>{
      return Number(totalArts) + Number(actual.cantidad)
    },0)
    const articulos = carrito.map(element => { 
      return {
      _id: element._id,
      nombre: element.nombre,
      cantidad:element.cantidad}})
    
    const facturita = {
        total,
        totalArt,
        articulos,
        nombre,
        methodPago,
        datos,
        fecha: Date.now()
    }
    setFactura(facturita)
    setCarrito([])
    localStorage.setItem("carritophears",JSON.stringify([]))
    router.push("/factura")
    
  }



  useEffect(()=>{
    try {
      const carritoLS = JSON.parse(localStorage.getItem("carritophears")) ?? []
      setCarrito(carritoLS) 
    } catch (error) {
      localStorage.setItem("carritophears",JSON.stringify([]))
    }
  },[])
  useEffect(()=>{
    const llamada = async () =>{

      const token = localStorage.getItem("token")
      if(!token) {
          return
        }
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      }
      if(token){
          try {
              const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuarios/obtener-favoritos`
              fetch(url,config).then(res => res.json()).then(dat => setFavoritos(dat))
            } catch (error) {
              console.log(error)
            }
          }
    }
    llamada()
  },[auth])

  return (
    <AppContext.Provider
        value={{
          carrito,
          agregarAlCarrito,
          agregarFavorito,
          removerFavorito,
          prenda,
          setPrenda,
          favoritos,
          cerrarSesionApp,
          removerDelCarrito,
          handleFactura,
          factura
        }}
    >
        {children}
    </AppContext.Provider>
  )
}

export{
    AppProvider
}

export default AppContext