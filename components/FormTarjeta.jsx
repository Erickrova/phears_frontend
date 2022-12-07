import React, { useState } from 'react'
import useApp from '../hooks/useApp'
import useAuth from '../hooks/useAuth'
import Alerta from './Alerta'

const FormTarjeta = () => {
    const [numTarjeta,setNumTarjeta] = useState(0)
    const [nombre,setNombre] = useState("")
    const [fechaExpiracion,setFechaExpiracion] = useState("")
    const [cvc,setCVC] = useState(0)
    const [alerta,setAlerta] = useState({})

    const {handleFactura,carrito} = useApp()
    const {auth} = useAuth()

    const handleSubmit = e =>{
      e.preventDefault()
      if([numTarjeta,nombre,fechaExpiracion,cvc].includes("") || numTarjeta <= 0 || fechaExpiracion <= 0 || cvc <= 0){
        setAlerta({
          mensaje:"Todos los campos son obligatorios",
          error:true
        })
        return
      }
      if(carrito.some(element => element.cantidad <= 0)){
        setAlerta({
          mensaje:"no puede haber un elemento con una cantidad 0 o menor a comprar",
          error:true
        })
        return
      }
      if(auth?._id){
        handleFactura("Credito o debito",auth.nombre,{numTarjeta,nombre})
        setAlerta({})
      }else{
        setAlerta({
          mensaje:"no puedes comprar sin una cuenta, registrate y realiza tu compra",
          error:true
        })
      }
    }
    const {mensaje} = alerta
    return (
      <form
        onSubmit={handleSubmit}
      >
          <legend className="text-center text-2xl font-bold">Pago via Tarjeta</legend>
          {mensaje ? <Alerta alerta={alerta} /> : null}
          <div className="py-2">
              <label className="w-full text-xl font-medium" htmlFor="numtarjeta">Número Tarjeta</label>
              <input 
              value={numTarjeta}
              onChange={e=> setNumTarjeta(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="number" id="numtarjeta" placeholder="Number de tarjeta aquí" />
          </div>
          <div className="py-2">
              <label className="w-full text-xl font-medium" htmlFor="nombre">Nombre</label>
              <input 
              value={nombre}
              onChange={e=> setNombre(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="text" id="nombre" placeholder="Nombre del propietario aquí" />
          </div>
          <div className="py-2">
              <label className="w-full text-xl font-medium" htmlFor="fechaexpiracion">Fecha Expiración</label>
              <input 
              value={fechaExpiracion}
              onChange={e=> setFechaExpiracion(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="number" id="fechaexpiracion" placeholder="Fecha expiración aquí" />
          </div>
          <div className="py-2">
              <label className="w-full text-xl font-medium" htmlFor="cvc">CVC</label>
              <input 
              value={cvc}
              onChange={e=> setCVC(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="number" id="cvc" placeholder="CVC aquí" />
          </div>
        <input className="w-full text-center cursor-pointer font-bold text-white px-2 py-1 rounded-md bg-green-400 hover:bg-green-500" type="submit" value="Pagar" />
      </form>
  )
}

export default FormTarjeta