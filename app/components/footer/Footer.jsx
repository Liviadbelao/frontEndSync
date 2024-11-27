import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";



import FooterInfos from "../footerInfos/FooterInfos";

const Footer = () => {
    return (
        <div className="justify-start w-100 bg-[#D9D9D9] p-1.5 sm:p-4 mt-36 flex ">
            <div className="w-[40%]">
                <div className="mb-2 ">
                    <h1 className="text-xl text-black border-b-2 border-[#E30613] w-[12%]"  >Desenvolvedores</h1>
                </div>
                <div className="flex mt-4">
                    <div className="mr-10 space-y-2 w-[30%]">
                        <FooterInfos integrante={'Maria Rita Gomes'} gitHubLink={'https://github.com/MariaRita011'} icon={FaGithub} />
                        <FooterInfos integrante={'Maria Eduarda Cancian'} gitHubLink={'https://github.com/MariaCancian'} icon={FaGithub} />
                        <FooterInfos integrante={'Rafael Cumpri'} gitHubLink={'https://github.com/Rafael-Cumpri'} icon={FaGithub} />
                    </div>
                    <div className="mr-10 space-y-2 w-[50%]">
                        <FooterInfos integrante={'Giovana Maia Basílio'} gitHubLink={'https://github.com/giobasiliox'} icon={FaGithub} />
                        <FooterInfos integrante={'Lívia Duarte Belão'} gitHubLink={'https://github.com/Liviadbelao'} icon={FaGithub} />
                        <FooterInfos integrante={'Isabela Oliveira'} gitHubLink={'https://github.com/isa1307'} icon={FaGithub} />
                    </div>
                </div>
            </div>

            <div className="mb-2 w-[40%] ">
                <h1 className="text-xl text-black border-b-2 border-[#E30613] w-[20%]"  >Links SENAI</h1>
                <div className="mt-4 space-y-2">
                    <FooterInfos integrante={'SENAI Valinhos - Site'} gitHubLink={'https://sp.senai.br/unidade/valinhos/'} icon={CgWebsite} />
                    <FooterInfos integrante={'SENAI Valinhos - Instagram'} gitHubLink={'https://www.instagram.com/senaivalinhos/'} icon={FaInstagram} />
                    <FooterInfos integrante={'SENAI Valinhos - LinkedIn'} gitHubLink={'https://br.linkedin.com/school/senai-de-valinhos/'} icon={CiLinkedin} />
                </div>
            </div>
            <div className="flex flex-col justify-between mt-4 h-[150px] text-right w-[20%]">
                <p className="text-sm text-black">Copyright 2024 © Todos os direitos reservados.</p>
                <img className="w-24 sm:w-48 ml-24 sm:w-16 sm:w-32 sm:ml-0" src={'/images/logoSenai/logo.png'} alt="Logo SENAI" />
            </div>
        </div>
    )
}

export default Footer