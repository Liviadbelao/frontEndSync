'use client'
import { useState } from 'react';
import Image from 'next/image';

const InputComponent = () => {
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState(null); // Estado para armazenar a pré-visualização

  const uploadImage = async (e) => {
    e.preventDefault();
    console.log("upload imagem");
    console.log(image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Gerar a URL temporária para pré-visualização da imagem
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={uploadImage}>
        <label htmlFor="inputField" style={styles.label}>Imagem:</label>
        <input
          id="inputField"
          type="file"
          name="image"
          onChange={handleImageChange}
          style={styles.input}
        />
        <button type='submit'>Salvar</button>

        {/* Exibir a imagem de pré-visualização */}
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