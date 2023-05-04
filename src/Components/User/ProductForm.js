import React from 'react';
import Input from '../Form/Input';
import useValidate from '../../Hooks/useValidate';
import TextArea from '../Form/TextArea';
import Button from '../Reusable/Button';
import useFetch from '../../Hooks/useFetch';
import { PRODUCT_POST } from '../../Api/api';
import styles from '../../Css/User/ProductForm.module.css';

const ProductForm = () => {
  const { request, loading, error } = useFetch();
  const nome = useValidate();
  const descricao = useValidate();
  const preco = useValidate();

  const imgs = React.useRef();
  const [preview, setPreview] = React.useState([]);

  const sendFormProduct = async (event) => {
    event.preventDefault();
    const allImgs = imgs.current.files;
    const formData = new FormData();
    formData.append('categoria', 'eletronicos');
    if (nome.validate() && preco.validate() && descricao.validate()) {
      formData.append('nome', nome.value);
      formData.append('descricao', descricao.value);
      formData.append('preco', preco.value);
      for (let i = 0; i < allImgs.length; i++) {
        formData.append(allImgs[i].name, allImgs[i]);
      }
      const token = localStorage.getItem('token');
      const { url, options } = PRODUCT_POST(formData, token);
      const response = await request(url, options);
      console.log(response);
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
    <form className={`${styles.productForm} container`} onSubmit={sendFormProduct}>
      <Input label="Nome" type="text" name="nome" {...nome} />
      <TextArea label="Descrição" name="descricao" {...descricao} />
      <Input label="Preço" type="number" name="preco" {...preco} />
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
        {preview.length < 1 && <span>Imagens</span>}
        {preview.length > 0 &&
          preview.map(({ url, raw }) => (
            <picture key={raw.name}>
              <img src={url} alt={raw.name} />
            </picture>
          ))}
      </div>
      <Button>Avançar</Button>
    </form>
  );
};

export default ProductForm;
