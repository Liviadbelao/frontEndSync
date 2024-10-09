'use client'
import { useRouter } from "next/navigation";

const ambientes = () => {

    return(
        <div>
            <p>Reserve sua sala:</p>
            <div className="bg-[#D9D9D9] w-[20%] h-50">
              
                <p>ambiente</p>
                <div className="text-center">
                <button className="bg-[#9A1915] text-white p-2 rounded-full">Reservar</button>

                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae ipsam fugit ratione inventore alias, facilis a minus perferendis impedit excepturi tempore, facere quas sint sunt! Placeat illum deserunt saepe quae.</p>
                <div className="bg-[#9A1915] text-white p-2 rounded-full">
                    <p>lili</p>
                </div>
            </div>
        </div>
    )
}

export default ambientes