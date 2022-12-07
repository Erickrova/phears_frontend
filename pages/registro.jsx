import { useState } from "react"
import Layout from "../components/Layout"

const Registro = () => {
    const [nombre,setNombre] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [rePassword,setRePassword] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if([nombre,email,password,rePassword].includes("")){
            alert("Todos los campos son obligatorios")
            return
        }
        try {
            const data = {
                nombre,
                email,
                password
            }
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuarios/register`
            fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(dat => console.log(dat))
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
        <form className="md:w-2/3 mx-auto p-4 mt-10 rounded-md shadow-xl"
            onSubmit={handleSubmit}
        >
            <legend className="text-center text-2xl font-bold">Registrate</legend>
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="nombre">Nombre</label>
                <input 
                value={nombre}
                onChange={e=> setNombre(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="text" id="nombre" placeholder="Nombre aqui" />
            </div>
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="email">Email</label>
                <input
                value={email}
                onChange={e=> setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="email" id="email" placeholder="E-Mail aqui" />
            </div>
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="password">Contraseña</label>
                <input 
                value={password}
                onChange={e=> setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="password" id="password" placeholder="Contraseña aqui" />
            </div>
            <div className="py-2">
                <label className="w-full text-xl font-medium" htmlFor="repassword">Repite Contraseña</label>
                <input 
                value={rePassword}
                onChange={e=> setRePassword(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 placeholder:text-gray-500" type="password" id="repassword" placeholder="Contraseña aqui" />
            </div>
            <input className="w-full text-center cursor-pointer font-bold text-white px-2 py-1 rounded-md bg-green-400 hover:bg-green-500" type="submit" value="Registrarme" />
        </form>
    </Layout>
  )
}

export default Registro