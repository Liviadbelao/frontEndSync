import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex justify-between items-center w-100 bg-[#D9D9D9] p-0.5 sm:p-2">
      <img className="w-40 sm:w-60" src={"/images/logoSenai/logo.png"} />
     
        <img  w-8 h-8 onClick={handleLogout} src={"/images/logoSenai/exit.png"} />
      
    </div>
  );
};

export default Header;