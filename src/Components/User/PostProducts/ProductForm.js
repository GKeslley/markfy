import React from 'react';
import Input from '../../Form/Input';
import useValidate from '../../../Hooks/useValidate';
import TextArea from '../../Form/TextArea';
import styles from '../../../Css/User/ProductForm.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../Reusable/Button';
import useFetch from '../../../Hooks/useFetch';
import { PRODUCT_POST } from '../../../Api/api';
import Error from '../../Helper/Error';

const ProductForm = ({ category, subcategory }) => {
  const [preview, setPreview] = React.useState([]);
  const imgs = React.useRef();
  const { request, loading, data, error } = useFetch();

  const name = useValidate();
  if (name.value.length > 60 && !name.error) {
    name.setError('Ultrapassou o limite de caracteres (60 caracteres)');
  }
  const description = useValidate();
  const price = useValidate();
  price.inputMode = 'numeric';
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!category) {
      navigate('../categoria');
    }
  }, [category, navigate]);

  if (!category) return null;

  const productCategory = category.endpoint;
  const productSubcategory = subcategory ? subcategory.endpoint : null;

  const formDataElements = () => {
    const formData = new FormData();
    const allImgs = imgs.current.files;
    if (name.validate() && price.validate() && description.validate() && preview.length) {
      console.log(preview);
      formData.append('nome', name.value);
      formData.append('descricao', description.value);
      formData.append('preco', price.value.replace('R$ ', ''));
      formData.append('categoria', productCategory);
      formData.append('subcategoria', productSubcategory);
      for (let i = 0; i < allImgs.length; i++) {
        formData.append(allImgs[i].name, allImgs[i]);
      }
    }
    return formData;
  };

  const sendFormProduct = async (event) => {
    event.preventDefault();
    const formData = formDataElements();
    const token = localStorage.getItem('token');
    const { url, options } = PRODUCT_POST(formData, token);
    const { response } = await request(url, options);

    if (response.ok) {
      alert('Produto postado com sucesso!');
      navigate('/');
    }
  };

  const imagesPreview = ({ target }) => {
    const files = target.files;
    console.log(files);
    if (files.length > 8) {
      alert('É permitido no máximo 8 imagens');
      setPreview([]);
      return null;
    }
    const arrFiles = [];
    for (let i = 0; i < files.length; i++) {
      arrFiles.push({ url: URL.createObjectURL(files[i]), raw: files[i] });
    }
    setPreview(arrFiles);
  };

  console.log(data);

  return (
    <div className={`${styles['product-content']} animeLeft container`}>
      <h1>Adicionar Produto</h1>
      <form className={`${styles['product-form']}`} onSubmit={sendFormProduct}>
        <Input
          label="Nome"
          type="text"
          name="nome"
          {...name}
          maxSize="60"
          maxLength={60}
        />

        <TextArea label="Descrição" name="descricao" {...description} />

        <label htmlFor="categoria" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Categoria
        </label>
        <input
          type="text"
          value={subcategory ? subcategory.subcategory : category.name}
          id="categoria"
          disabled
        />

        <Input label="Preço" type="text" name="preco" {...price} />

        <input
          type="file"
          multiple
          name="file"
          id="file"
          onChange={imagesPreview}
          ref={imgs}
          accept="image/*"
          required
        />

        <div className={styles['imgs-content']}>
          {preview.length < 1 ? (
            <span>Imagens</span>
          ) : (
            preview.map(({ url, raw }) => (
              <picture key={raw.name}>
                <img src={url} alt={raw.name} />
              </picture>
            ))
          )}
        </div>
        {loading ? (
          <Button disabled="disabled">Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {error && <Error>{error}</Error>}
      </form>
    </div>
  );
};

export default ProductForm;
