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
    <div className="flex justify-end items-center w-full bg-[#D9D9D9] p-0.5 sm:p-2 gap-x-2">
      <img className="w-40  mr-auto" src={"/images/logoSenai/logo.png"} alt="Logo" />
      <img
        className="w-5 sm:w-10 cursor-pointer"
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
