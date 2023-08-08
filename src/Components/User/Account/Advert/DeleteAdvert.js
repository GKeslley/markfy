import React from 'react';
import { FaTrash } from 'react-icons/fa';
import useFetch from '../../../../Hooks/useFetch';
import { PRODUCT_DELETE } from '../../../../Api/api';
import Spinner from '../../../Reusable/Spinner';

const DeleteAdvert = ({ slug, index: indexElement, getProducts }) => {
  const [index, setIndex] = React.useState(null);
  const { request, loading } = useFetch();

  const deletePost = async () => {
    setIndex(indexElement);
    const token = localStorage.getItem('token');
    const { url, options } = PRODUCT_DELETE({ slug, token });
    const { response, json } = await request(url, options);
    if (response.ok) {
      getProducts();
    }
    console.log(response);
    console.log(json);
  };

  return (
    <>
      {loading && index === indexElement ? (
        <Spinner width="8px" />
      ) : (
        <picture onClick={deletePost}>
          <FaTrash fill="#e54" />
        </picture>
      )}
    </>
  );
};

export default DeleteAdvert;
