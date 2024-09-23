'use client';
import { useState } from 'react';
import Image from 'next/image';
import api from '../src/config/configApi';

const InputComponent = () => {
  const [image, setImage] = useState(null);
  const [nif, setNif] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [descriptor, setDescriptor] = useState('00');
  const [notification, setNotification] = useState(false);
  const [notiwhere, setNotiwhere] = useState(0);
  const [adm, setAdm] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nif', nif);
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('telefone', telefone);
    formData.append('adm', adm);
    formData.append('descriptor', descriptor);
    formData.append('notification', notification);
    formData.append('notiwhere', notiwhere);
    formData.append('image', image);


    console.log(formData);
    

    try {
      const response = await api.post("/usuarios", formData);
      console.log(response);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log("Erro, tente novamente mais tarde.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(image);
    

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={uploadImage}>
        <label style={styles.label}>Imagem:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          style={styles.input}
        />

        <label style={styles.label}>Nif:</label>
        <input
          type="number"
          name="nif"
          value={nif}
          onChange={(e) => setNif(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Nome:</label>
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Telefone:</label>
        <input
          type="number"
          name="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button type="submit">Enviar</button>

        {preview && (
          <div style={styles.imageContainer}>
            <Image
              src={preview}
              alt="Imagem pré-visualizada"
              width={300}
              height={300}
              style={styles.image}
            />
          </div>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '10px',
    display: 'block',
  },
  input: {
    height: '30px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px 10px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
  },
  imageContainer: {
    marginTop: '20px',
  },
  image: {
    borderRadius: '10px',
  },
};

export default InputComponent;