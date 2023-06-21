import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../Css/Products/Product.module.css';
import useFetch from '../../Hooks/useFetch';
import { PRODUCT_GET } from '../../Api/api';
import Button from '../Reusable/Button';
import { GlobalContext } from '../../Hooks/UserContext';
import UserProduct from './UserProduct';
import Comments from './Comments';
import LikeProduct from './LikeProduct';

const Product = (props) => {
  const { request, data: dataProduct } = useFetch();
  const { slug } = useParams();
  const { userData } = React.useContext(GlobalContext);

  const [getAllImages, setAllImages] = React.useState([]);
  const [imageActive, setImageActive] = React.useState(null);

  console.log(dataProduct);

  React.useEffect(() => {
    if (dataProduct) {
      setAllImages(() => {
        return dataProduct.fotos.reduce((acc, val, i) => {
          acc[i] = {
            src: val.src,
            titulo: val.titulo,
            active: i === 0 ? true : false,
            index: i,
          };
          return acc;
        }, []);
      });
      setImageActive({
        index: 0,
        src: dataProduct.fotos[0].src,
        titulo: dataProduct.fotos[0].titulo,
      });
    }
  }, [dataProduct]);

  React.useEffect(() => {
    const product = async () => {
      const { url, options } = PRODUCT_GET(slug);
      await request(url, options);
    };
    product();
  }, [request, slug]);

  if (!dataProduct) return null;

  const handleChangeImage = ({ target }) => {
    const index = target.getAttribute('data-index');
    const changeImages = getAllImages.map((obj, i) => {
      obj.active = false;
      getAllImages[+index].active = true;
      return obj;
    });

    setAllImages(changeImages);
    setImageActive(getAllImages[+index]);
  };

  const portion = +dataProduct.preco.replace(/\D/g, '') / 12;
  const portionPrice = Number.isInteger(portion)
    ? portion
    : portion.toFixed(2).replace('.', ',');

  return (
    <>
      {dataProduct && imageActive && userData && (
        <section className="container">
          <div className={styles.productContent}>
            <article className={styles.productAndInfos}>
              <LikeProduct slug={slug} userID={userData.usuario_id} />
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
                  {getAllImages.map(({ src, titulo, index }, i) => (
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
                  <span>12x de R$ {portionPrice} sem juros</span>
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
