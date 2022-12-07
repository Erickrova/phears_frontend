import Image from 'next/image'
import CardGarment from '../../../components/CardGarment'
import ComboMasculino from '../../../components/ComboMasculino'
import Layout from '../../../components/Layout'
import NavMasculino from '../../../components/NavMasculino'
const Pantalones = ({clothes}) => {
  return (
    <Layout>
        <NavMasculino />
        <div className='md:w-3/4 mx-auto'>
          <ComboMasculino />
          <div className='aparecer flex flex-wrap justify-center items-center gap-4 mt-10 md:mt-20 pb-10'>
              {clothes?.length ? clothes.map(clothe =>(
                <CardGarment key={clothe._id} prenda={clothe} />
              )):null}
              
          </div>
        </div>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const url = `${process.env.BACKEND_URL}/api/clothes/obtener-clothes`
  const response = await fetch(url)
  const data = await response.json()
  const clothes = data.filter(prenda => prenda.categoria == "Masculino/Pantalon" )
return {
props: {
clothes
}, // will be passed to the page component as props
}
}

export default Pantalones