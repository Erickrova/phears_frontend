import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import CardGarmentAdmin from '../../components/admin/CardGarmentAdmin'

const Catalogo = ({clothes}) => {
    const [categoria,setCategoria] = useState("Todo")
    const [clothesState,setClothesState] = useState([])

    useEffect(()=>{
        if(categoria == "Todo"){
          setClothesState(clothes)
        }else{
          const clothesFiltrados = clothes.filter(clothe => clothe.categoria == categoria)
          setClothesState(clothesFiltrados)
        }
    },[categoria,clothes])

  return (
    <AdminLayout>
        <form className='flex flex-col md:flex-row justify-center items-center gap-2 md:pr-4 w-full md:w-auto'>
            <label htmlFor="categoria">Filtrar Por Categoria</label>
            <select value={categoria} onChange={e=>setCategoria(e.target.value)} id='categoria' className='p-2 my-2 rounded-md text-white font-bold bg-sky-400'>
                    <option value="Todo">Todo</option>
                    <option value="Masculino/Camiseta"  >Masculino/Camiseta</option>
                    <option value="Masculino/Pantalon"  >Masculino/Pantalon</option>
                    <option value="Masculino/Zapatos"  >Masculino/Zapatos</option>
                    <option value="Masculino/Accesorios"  >Masculino/Accesorios</option>
                    <option value="Femenino/Blusa"  >Femenino/Blusa</option>
                    <option value="Femenino/Pantalon"  >Femenino/Pantalon</option>
                    <option value="Femenino/Zapatos"  >Femenino/Zapatos</option>
                    <option value="Femenino/Accesorios"  >Femenino/Accesorios</option>
            </select>
        </form>
        <div className='w-full aparecer flex flex-wrap justify-center items-center gap-4 mt-10 md:mt-20 pb-10'>
              {clothesState?.length ? clothesState.map(clothe =>(
                <CardGarmentAdmin key={clothe._id} prenda={clothe} />
              )):<p className='text-xl font-bold text-center'>No hay Articulos</p>}
              
        </div>
    </AdminLayout>
  )
}
export async function getServerSideProps(context) {
    const url = `${process.env.BACKEND_URL}/api/clothes/obtener-clothes`
    const response = await fetch(url)
    const data = await response.json()
return {
props: {
  clothes:data
},
}
}


export default Catalogo