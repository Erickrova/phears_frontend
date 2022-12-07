import Image from 'next/image'
import CardGarment from '../../../components/CardGarment'
import ComboFemenino from '../../../components/ComboFemenino'
import ComboMasculino from '../../../components/ComboMasculino'
import Layout from '../../../components/Layout'
import NavFemenino from '../../../components/NavFemenino'


const Mujeres = ({clothes}) => {
  return (
    <Layout>
        <NavFemenino />
        <div className='md:w-3/4 mx-auto'>
          <ComboFemenino />
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
  const clothes = data.filter(prenda => prenda.categoria == "Femenino/Blusa" )
return {
props: {
clothes
}, // will be passed to the page component as props
}
}

export default Mujeres