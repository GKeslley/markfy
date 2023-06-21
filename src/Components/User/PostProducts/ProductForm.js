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

const ProductForm = ({ category, getSubcategory }) => {
  const [preview, setPreview] = React.useState([]);
  const imgs = React.useRef();
  const { request, loading, error } = useFetch();

  const nome = useValidate();
  const descricao = useValidate();
  const preco = useValidate();
  preco.inputMode = 'numeric';
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!category) {
      navigate('../categoria');
    }
  }, [category, navigate]);

  if (!category) return null;

  const productCategory = category.endpoint;
  const productSubcategory = getSubcategory ? getSubcategory.endpoint : null;

  console.log(category);
  console.log(getSubcategory);

  const formDataElements = () => {
    const formData = new FormData();
    const allImgs = imgs.current.files;
    if (nome.validate() && preco.validate() && descricao.validate()) {
      formData.append('nome', nome.value);
      formData.append('descricao', descricao.value);
      formData.append('preco', preco.value.replace('R$ ', ''));
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
    let response;

    try {
      if (!productCategory) {
        throw new Error('Selecione uma categoria para o produto!');
      }
      const token = localStorage.getItem('token');
      const { url, options } = PRODUCT_POST(formData, token);
      response = await request(url, options);
      if (!response.response.ok) {
        throw new Error('Não foi possível realizar esta ação, tente novamente!');
      }
    } catch (Error) {
      response = null;
      alert(Error);
      return false;
    }

    if (response) {
      alert('Produto postado com sucesso!');
      navigate('/');
    }
  };

  const imagesPreview = ({ target }) => {
    const files = target.files;
    const arrFiles = [];
    for (let i = 0; i < files.length; i++) {
      arrFiles.push({ url: URL.createObjectURL(files[i]), raw: files[i] });
    }
    setPreview(arrFiles);
  };

  console.log(preview);

  return (
    <div className={`${styles.productContent} animeLeft container`}>
      <h1>Adicionar Produto</h1>
      <form className={`${styles.productForm}`} onSubmit={sendFormProduct}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <TextArea label="Descrição" name="descricao" {...descricao} />

        <label htmlFor="categoria">Categoria</label>
        <input
          type="text"
          value={getSubcategory ? getSubcategory.subcategory : category.name}
          id="categoria"
          disabled
        />

        <Input label="Preço" type="text" name="preco" {...preco} />
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

        <div className={styles.imgsContent}>
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
