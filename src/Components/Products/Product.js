import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../Css/Products/Product.module.css';
import useFetch from '../../Hooks/useFetch';
import { PRODUCT_GET } from '../../Api/api';
import Button from '../Reusable/Button';
import { GlobalContext } from '../../Hooks/UserContext';
import UserProduct from './UserProduct';
import Comments from './Comments';

const Product = (props) => {
  const { slug } = useParams();
  const { request, data } = useFetch();

  const [imageActive, setImageActive] = React.useState(null);
  const [imagesGallery, setImagesGalery] = React.useState(null);

  const { userData } = React.useContext(GlobalContext);
  const dataProduct = props.dataProduct ? props.dataProduct : data;

  console.log(dataProduct);

  const getAllImages = React.useCallback(() => {
    if (dataProduct) {
      return dataProduct.fotos
        .slice(1, dataProduct.fotos.length)
        .reduce((acc, val, i) => {
          acc[i] = { src: val.src, titulo: val.titulo, active: false, index: i + 1 };
          return acc;
        }, []);
    }
    return [];
  }, [dataProduct]);

  const getFirstImage = React.useCallback(() => {
    if (dataProduct) {
      const firstImage = dataProduct.fotos[0];
      return {
        src: firstImage.src,
        titulo: firstImage.titulo,
        active: true,
        index: 0,
      };
    }
    return null;
  }, [dataProduct]);

  const getImagesGallery = React.useCallback(() => {
    if (dataProduct) {
      setImagesGalery([getFirstImage(), ...getAllImages()]);
    }
  }, [dataProduct, getAllImages, getFirstImage]);

  React.useEffect(() => {
    getImagesGallery();
    setImageActive(getFirstImage());
  }, [getImagesGallery, getFirstImage]);

  React.useEffect(() => {
    if (!props.dataProduct) {
      const product = async () => {
        const { url, options } = PRODUCT_GET(slug);
        await request(url, options);
      };
      product();
    }
  }, [request, slug, props]);

  if (!dataProduct) return null;

  const handleChangeImage = ({ target }) => {
    const index = target.getAttribute('data-index');
    const changeImages = imagesGallery.map((obj, i) => {
      obj.active = false;
      imagesGallery[+index].active = true;
      return obj;
    });

    setImagesGalery(changeImages);
    setImageActive(imagesGallery[+index]);
  };

  const portion = +dataProduct.preco / 12;
  const portionPrice = Number.isInteger(portion)
    ? portion
    : portion.toFixed(2).replace('.', ',');

  return (
    <>
      {dataProduct && imageActive && (
        <section className="container">
          <div className={styles.productContent}>
            <article className={styles.productAndInfos}>
              <div className={styles.productImages}>
                <figure>
                  <img
                    src={imageActive.src}
                    alt={imageActive.titulo}
                    data-index={imageActive.index}
                    width={250}
                    height={500}
                  />
                </figure>

                <div className={styles.galeryImages}>
                  {imagesGallery.map(({ src, titulo, index }, i) => (
                    <picture key={i} className={imageActive.index === i ? 'active' : ''}>
                      <img
                        src={src}
                        alt={titulo}
                        width={44}
                        height={44}
                        data-index={index}
                        onMouseOver={handleChangeImage}
                      />
                    </picture>
                  ))}
                </div>
              </div>

              <ul className={styles.productInfos}>
                <li className={styles.productName}>{dataProduct.nome}</li>
                <li>Frete</li>
                <li className={styles.productPrice}>
                  <p>R$ {dataProduct.preco}</p>
                  <span>12x de R$ {portionPrice}</span>
                </li>
                <li className={styles.productBtns}>
                  <Button>Comprar</Button>
                  <Button>Fazer Oferta</Button>
                </li>

                <UserProduct keyUser={dataProduct.usuario_id} />
              </ul>
            </article>

            <article className={styles.productDescription}>
              <h2>Descrição</h2>
              <p>{dataProduct.descricao}</p>
            </article>

            <Comments
              userData={userData}
              allComments={dataProduct.comentarios}
              authorPost={dataProduct.usuario_id}
              slug={slug}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Product;
