//componente dos topicos do menu do adm
const TopicosMenu = ({ topicos, imgSrc,onClick }) => {
    return (
        <div className="c flex items-center">
            <button
                className="w-[100%] my-1 p-6 text-left  relative"
                style={{ backgroundColor: 'white', color: 'black', height: '100px' }}
                onClick={onClick}
            >
                {/* linha vermelha do lado esquerdo */}
                <span
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1/2 border-l-4 border-red-500"
                    style={{ height: '60%' }}
                ></span>
                {/* img e texto */}
                <div className="flex items-center"> 
                    {imgSrc && <img src={imgSrc} alt={topicos} className="w-14 h-14 mr-2" />}
                    {topicos}
                </div>


            </button>
        </div>
    );
}

export default TopicosMenu;
