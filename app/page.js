//Necessários
"use client";

//Importações

//Criando Página
const Selection = () => {
  //Criando Estados

  //Funções

  //Corpo da Página
  return (
    /* Div Principal */
    <div
      className="h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/telaSelection/inicioSelection.jpg")',
        backgroundPosition: "center 56%",
      }}
    >
      {/* Div Botões caminhos */}
      <div className="flex justify-end gap-4 fixed bottom-14 right-8">
        {/* Botão Rota Administração */}
        <button className="bg-[#D9D9D9] text-[#9A1915] font-extrabold text-base sm:text-xl py-3 px-6 border">
          ADMINISTRADOR
        </button>

        {/* Botão Rota Totem */}
        <button className="bg-[#D9D9D9] text-[#9A1915] xl:hidden font-extrabold text-base sm:text-xl py-3 px-6 border">
          TOTEM
        </button>
      </div>
    </div>
  );
};

export default Selection;
