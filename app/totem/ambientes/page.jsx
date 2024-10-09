'use client'
import { useRouter } from "next/navigation";

const ambientes = () => {

    return(
        <div>
            <p>Reserve sua sala:</p>
            <div className="bg-[#D9D9D9] w-[20%] h-50 rounded-lg z-10 fixed relative">
                <img src={'/salaAleatoria.jpg'} className="h-[150px] w-[500px] rounded-lg"/>
                <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                    <button className="bg-[#9A1915] text-white p-2 rounded-full z-20">
                        Reservar
                    </button>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae ipsam fugit ratione inventore alias, facilis a minus perferendis impedit excepturi tempore, facere quas sint sunt! Placeat illum deserunt saepe quae.</p>
                <div className="bg-[#9A1915] text-white z-20 p-2 rounded-full absolute  left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                    <p>lili</p>
                </div>
            </div>
        </div>
    )
}

export default ambientes;