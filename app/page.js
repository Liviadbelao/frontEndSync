'use client';

import Image from 'next/image';


const Selection = () => {



  return (
    <div className="h-screen bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/images/telaSelection/inicioSelection.jpg")',
      backgroundPosition: 'center 56%' }}>

<div className="flex justify-end gap-4 fixed bottom-14 right-8">
        <button className="bg-[#D9D9D9] text-[#9A1915] font-extrabold text-base sm:text-xl py-3 px-6 border">
          ADMINISTRADOR
        </button>
        <button className="bg-[#D9D9D9] text-[#9A1915] xl:hidden font-extrabold text-base sm:text-xl py-3 px-6 border">
          TOTEM
        </button>
      </div>

    </div>
  );
};



export default Selection;