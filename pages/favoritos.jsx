import CardGarment from '../components/CardGarment'
import Layout from '../components/Layout'
import useApp from '../hooks/useApp'

const Favoritos = () => {
  const {favoritos} = useApp()
  return (
    <Layout>
        <h2 className='text-2xl font-bold text-center py-10'>Tus Favoritos</h2>
        <div className='flex flex-wrap gap-2 items-center justify-center'>
           {favoritos?.length ? favoritos.map(favorito => (
            <CardGarment key={favorito._id} prenda={favorito} />
           )):<p className='text-center text-xl font-bold'>No Tienes Favoritos</p>}
        </div>
    </Layout>
  )
}


export default Favoritos