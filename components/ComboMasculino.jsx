import Image from "next/image"

const ComboMasculino = () => {
  return (
    <div className="w-full flex justify-center items-center">
        <div className=" w-full flex flex-col md:justify-center items-center gap-14 md:flex-row md:gap-2">
            <div id="imgsComboMasculino" className="relative h-fit pb-14">
                <Image src="/img/catalogoMasculino/black_tshirt.png"
                className=" w-auto h-auto"
                height={400} width={200} alt="black t-shirt" />
                <Image src="/img/catalogoMasculino/white_tshirt.png"
                className=" w-auto h-auto absolute z-10 top-1/3 md:left-1/3"
                height={400} width={200} priority alt="black t-shirt" />
            </div>
            <div id="textComboMasculino">
                <div className="md:ml-10">
                    <h2 className="text-5xl text-center md:text-left font-bold text-sky-500 uppercase lg:whitespace-pre">Super combo</h2>
                    <p className="text-3xl text-center md:text-left font-bold text-red-500">2 camisetas x 1</p>
                </div>
                <div className="md:pt-20 lg:ml-20 md:ml-10">
                    <p className=" text-lg text-center md:text-left capitalize">Aprovecha ya nuestra maravillosa oferta</p>
                    <p className=" italic  text-gray-800 text-center md:text-left 
                    ">Disponible Hasta el 2/2/2023</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ComboMasculino