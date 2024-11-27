const FooterInfos = ({ integrante, gitHubLink, icon: Icon }) => {
    return (
        <div className="flex">
            {Icon && (
                <Icon 
                    onClick={() => window.open(gitHubLink, "_blank")}  
                    className="text-black cursor-pointer mr-2" 
                />
            )}
            <p className="text-sm text-black">{integrante}</p>
        </div>
    );
};

export default FooterInfos;
