import {createContext, useEffect, useState} from "react"

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth,setAuth] = useState({})
    const [cargando,setCargando] = useState(true)

    const cerrarSesionAuth = () =>{
        setAuth({})
        localStorage.removeItem("token")
    }

    useEffect(()=>{
        const autenticando = async ()=>{
            const token = localStorage.getItem("token")
            if(!token) {
                setCargando(false)
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
                    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuarios/perfil`
                    fetch(url,config).then(res => res.json()).then(dat => setAuth(dat))
                } catch (error) {
                    console.log(error)
                    setAuth({})
                }finally{
                    setCargando(false)
                }
            }
            
        }
        autenticando()
    },[])

  return (
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando,
            setCargando,
            cerrarSesionAuth
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export{
    AuthProvider
}

export default AuthContext