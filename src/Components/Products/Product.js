import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../Css/Products/Product.module.css';
import useFetch from '../../Hooks/useFetch';
import useMedia from '../../Hooks/useMedia';
import { PRODUCT_GET } from '../../Api/api';
import Button from '../Reusable/Button';
import UserProduct from './UserProduct';
import Comments from './Comments';
import LikeProduct from './LikeProduct';
import CarouselImages from './Mobile/CarouselImages';
import ProductSkeleton from '../Skeletons/ProductSkeleton';
import Image from '../Helper/Image';

const Product = () => {
  const [allImages, setAllImages] = React.useState({
    images: [],
    activeImage: null,
  });
  const { request, data: dataProduct } = useFetch();
  const { slug } = useParams();
  const match = useMedia('(max-width: 830px)');
  const navigate = useNavigate();

  const images = React.useCallback((arr) => {
    const imagesData = arr.reduce((acc, val, i) => {
      acc[i] = {
        src: val.src,
        titulo: val.titulo,
        active: i === 0 ? true : false,
        index: i,
      };
      return acc;
    }, []);
    return imagesData;
  }, []);

  if (dataProduct && !allImages.images.length) {
    const imagesProduct = images(dataProduct.fotos);
    setAllImages({ images: imagesProduct, activeImage: imagesProduct[0] });
  }

  React.useEffect(() => {
    const product = async () => {
      const { url, options } = PRODUCT_GET(slug);
      await request(url, options);
    };
    product();
  }, [request, slug]);

  const handleChangeImage = ({ target }) => {
    const index = target.getAttribute('data-index');
    const changeImages = allImages.images.map((obj, i) => {
      obj.active = false;
      allImages.images[+index].active = true;
      return obj;
    });

    setAllImages({ images: changeImages, activeImage: changeImages[+index] });
  };

  if (!dataProduct || !allImages.activeImage) {
    return <ProductSkeleton />;
  }
  const portion = +dataProduct.preco.replace(/\D/g, '') / 12;
  const portionPrice = Number.isInteger(portion)
    ? portion
    : portion.toFixed(2).replace('.', ',');

  return (
    <>
      <section className={`${styles['product-container']} container`}>
        <div className={styles['product-content']}>
          <article className={styles['product-infos']}>
            <LikeProduct slug={slug} />
            {!match ? (
              <div className={styles['product-images']}>
                <figure>
                  <Image
                    alt={allImages.activeImage.titulo}
                    src={allImages.activeImage.src}
                    data-index={allImages.activeImage.index}
                    width={250}
                    height={500}
                  />
                </figure>

                <div className={styles['galery-images']}>
                  {allImages.images.map(({ src, titulo, index }, i) => (
                    <picture
                      key={i}
                      className={allImages.activeImage.index === i ? 'active' : ''}
                    >
                      <Image
                        alt={titulo}
                        src={src}
                        width={44}
                        height={44}
                        data-index={index}
                        onMouseOver={handleChangeImage}
                      />
                    </picture>
                  ))}
                </div>
              </div>
            ) : (
              <CarouselImages images={allImages.images} />
            )}
            <ul className={styles['product-infos-fields']}>
              <li className={styles['product-name']}>{dataProduct.nome}</li>
              <li>Frete</li>
              <li className={styles['product-price']}>
                <p>R$ {dataProduct.preco}</p>
                <span>12x de R$ {portionPrice} sem juros</span>
              </li>
              <li className={styles['product-btns']}>
                {dataProduct.vendido === 'true' ? (
                  <Button>Indisponível</Button>
                ) : (
                  <Button onClick={() => navigate(`/transacao/${dataProduct.slug}`)}>
                    Comprar
                  </Button>
                )}
                <Button>Fazer Oferta</Button>
              </li>

              <UserProduct keyUser={dataProduct.usuario_id} />
            </ul>
          </article>

          <article className={styles['product-description']}>
            <h2>Descrição</h2>
            <p>{dataProduct.descricao}</p>
          </article>

          <Comments
            allComments={dataProduct.comentarios}
            authorPost={dataProduct.usuario_id}
            slug={slug}
            sellProduct={dataProduct.vendido}
          />
        </div>
      </section>
    </>
  );
};

export default Product;
