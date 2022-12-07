import React from 'react'
import Layout from '../components/Layout'
import useApp from '../hooks/useApp'

const Factura = () => {
    const {factura} = useApp()
    const nuevaFecha = new Date(factura.fecha) 
    const opt = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        
    }
    const fechaFormateada = nuevaFecha.toLocaleDateString("es-ES",opt)
  return (
    <Layout>
        {factura.methodPago ? (

            <div className='w-full md:w-2/3 mx-auto shadow-xl mt-10 p-4 rounded-xl'>
            <h2 className='text-2xl font-bold text-center mb-4'>Tu Factura</h2>
            <p>Tienda: Phears Company </p>
            <p>Fecha: {fechaFormateada} </p>
            <p>Metodo de pago: {factura?.methodPago}</p>
            <p>Nombre de usuario: {factura?.nombre}</p>
            {factura?.datos?.email ? (
                <p>Correo Paypal: {factura?.datos?.email}</p>
            ):null}
            {factura?.datos?.cartera ? (
                <p>Cartera Crypto: {factura?.datos?.cartera}</p>
            ):null}
            {factura?.datos?.numTarjeta ? (
                <>
                <p>Numero Tarjeta: {factura?.datos?.numTarjeta}</p>
                <p>Nombre Propietario: {factura?.datos?.nombre}</p>
                </>
            ):null}
            <p>Total Articulos a pagar : {factura.totalArt}</p>
            <p>Total a pagar : {factura.total}</p>
            <p className='font-bold'>Articulos:</p>
            <div className='p-2 bg-gray-100'>
            {factura?.articulos.length ? factura.articulos.map(articulo =>(
                <p key={articulo._id}> {articulo.nombre} * {articulo.cantidad} </p>
                )):null}
            </div>
        </div>
        ) : <p className='text-2xl font-bold text-center'>No haz realizado una compra aún</p> }
    </Layout>
  )
}

export default Factura