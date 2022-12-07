import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <p className={`${alerta.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`} >{alerta.mensaje}</p>
  )
}

export default Alerta