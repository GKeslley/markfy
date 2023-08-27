import React from 'react';
import { FaTrash } from 'react-icons/fa';
import useFetch from '../../../../Hooks/useFetch';
import { PRODUCT_DELETE } from '../../../../Api/api';

const DeleteAdvert = ({ slug, setDeleteIndex, setNotification }) => {
  const { request, error } = useFetch();

  const deletePost = async () => {
    if (window.confirm('Você realmente deseja deletar o anúncio?')) {
      setDeleteIndex();
      const token = localStorage.getItem('token');
      const { url, options } = PRODUCT_DELETE({ slug, token });
      const { response } = await request(url, options);
      if (response.ok) {
        setNotification({ error: false, message: 'Anúncio deletado com sucesso' });
        return null;
      }
      setNotification({ error: true, message: error });
    }
  };

  return (
    <>
      <picture onClick={deletePost} style={{ cursor: 'pointer' }} title="Deletar">
        <FaTrash fill="#e54" />
      </picture>
    </>
  );
};

export default DeleteAdvert;
