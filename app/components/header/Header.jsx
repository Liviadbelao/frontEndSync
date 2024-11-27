import { useRouter, useSearchParams } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const nif = searchParams.get('nif'); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleConfigClick = () => {
    router.push(`/configuracaoInicial/?nif=${nif}`);
  };

  return (
    <div className="flex justify-between items-center w-100 bg-[#D9D9D9] p-0.5 sm:p-2">
      <img className="w-40 sm:w-60" src={"/images/logoSenai/logo.png"} />
      <img
        className="w-5 sm:w-10 ml-[76%] cursor-pointer"
        src={"/images/logoSenai/engrenagem.png"}
        onClick={handleConfigClick}
        alt="Configuração Inicial"
      />
      <img
        className="w-12 h-12 cursor-pointer"
        src={"/images/logoSenai/exit.png"}
        onClick={handleLogout}
        alt="Logout"
      />
    </div>
  );
};

export default Header;
