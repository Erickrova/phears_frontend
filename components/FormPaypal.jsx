import { useState } from 'react'
import useApp from '../hooks/useApp'
import useAuth from '../hooks/useAuth'
import Alerta from './Alerta'

const FormPaypal = () => {
    const [email,setEmail] = useState("")
    const [alerta,setAlerta] = useState({})

    const {handleFactura,carrito} = useApp()
    const {auth} = useAuth()
    
    const handleSubmit = e =>{
      e.preventDefault()
      if([email].includes("")){
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
        handleFactura("Paypal",auth.nombre,{email})
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
        <legend className="text-center text-2xl font-bold">Pago via Paypal</legend>
        {mensaje ? <Alerta alerta={alerta} /> : null}
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="email">E-Mail</label>
                <input 
                value={email}
                onChange={e=> setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="text" id="email" placeholder="Email aqui" />
            </div>
            <input className="w-full text-center cursor-pointer font-bold text-white px-2 py-1 rounded-md bg-green-400 hover:bg-green-500" type="submit" value="Pagar" />
    </form>
  )
}

export default FormPaypal