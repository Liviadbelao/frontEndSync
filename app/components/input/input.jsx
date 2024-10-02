const Input = ({tipo,placeholder, valor, onChange, nome }) =>{
    return(
        <div>
               <input
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