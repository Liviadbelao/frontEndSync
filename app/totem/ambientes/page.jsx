'use client'
import { useRouter } from "next/navigation";
import { BsWrenchAdjustableCircle } from "react-icons/bs";
import { TbAirConditioning } from "react-icons/tb";
import { GiComputerFan } from "react-icons/gi";
import { AiOutlineWifi } from "react-icons/ai";
import { LuProjector } from "react-icons/lu";

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
                <div className="bg-[#9A1915] gap-2 flex text-white z-20 p-2 rounded-full absolute  left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <BsWrenchAdjustableCircle />
                <TbAirConditioning />
                <GiComputerFan />
                <AiOutlineWifi />
                <LuProjector />

                </div>
            </div>
        </div>
    )
}

export default ambientes;