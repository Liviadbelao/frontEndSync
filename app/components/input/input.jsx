const Input = ({tipo,placeholder, valor, onChange, nome }) =>{
    return(
        <div >
               <input
               className="w-[100%] my-1 p-2" 
          type={tipo}
          name={nome}
          placeholder={placeholder}
          value={valor}
          onChange={onChange}
        
        />
        </div>
    )
}

export default Input