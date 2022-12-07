import { useState } from "react"
import Layout from "../components/Layout"
import {useRouter} from "next/router"
import useAuth from "../hooks/useAuth"

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {setAuth} = useAuth()
    const router = useRouter()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if([email,password].includes("")){
            alert("Todos los campos son obligatorios")
            return
        }
        try {
            const data = {
                email,
                password
            }
            const config = {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuarios/login`
            
            fetch(url,config).then(res => res.json()).then(dat => {
                setAuth(dat)
                localStorage.setItem("token",dat.token)
            })
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
        <form
        onSubmit={handleSubmit}
        className="md:w-2/3 mx-auto p-4 mt-10 rounded-md shadow-xl">
            <legend className="text-center text-2xl font-bold">Inicia Sesión</legend>
            
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
            <input className="w-full text-center cursor-pointer font-bold text-white px-2 py-1 rounded-md bg-sky-400 hover:bg-sky-500" type="submit" value="Iniciar Sesión" />
        </form>
    </Layout>
  )
}

export default Login