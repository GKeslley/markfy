import React from 'react';
import Category from './Category';
import Subcategory from './Subcategory';
import styles from '../../../../Css/User/ProductCategory.module.css';

const categories = [
  {
    name: 'Imóveis',
    subcategories: ['Apartamentos', 'Casas', 'Terrenos, sítios e fazendas'],
    endpoint: 'imoveis',
  },
  {
    name: 'Autos e peças',
    subcategories: [
      'Carros, vans e utilitários',
      'Motos',
      'Ônibus',
      'Caminhões',
      'Barcos e aeronaves',
      'Peças e acessórios',
    ],
    endpoint: 'autos_pecas',
  },
  {
    name: 'Para a sua casa',
    subcategories: [
      'Móveis',
      'Eletrodomésticos',
      'Materiais de construção',
      'Utilidades domésticas',
      'Decoração',
    ],
    endpoint: 'casa',
  },
  {
    name: 'Eletrônicos',
    subcategories: [
      'Videogames',
      'Computadores e acessórios',
      'Celulares e telefones',
      'Áudio, TV, vídeo',
    ],
    endpoint: 'eletronicos',
  },
  {
    name: 'Agro e indústria',
    subcategories: [],
    endpoint: 'agro_industria',
  },
  {
    name: 'Esportes e lazer',
    subcategories: ['Esportes e ginástica', 'Ciclismo'],
    endpoint: 'esportes_lazer',
  },
  {
    name: 'Moda',
    subcategories: ['Roupas e calçados', 'Bijouterias e acessórios'],
    endpoint: 'moda',
  },
];

const ProductCategory = ({ setCategory, category, setGetSubcategory }) => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
    setCategory(categories[index]);
  };

  React.useEffect(() => {
    setGetSubcategory(null);
  }, [category, setGetSubcategory]);

  return (
    <section className={`${styles.categoriesContainer} animeLeft`}>
      <h1>O que você está anunciando?</h1>
      <div>
        <p>Categorias*</p>
        <ul className={styles.categories}>
          {categories.map(({ name, subcategories }, i) => (
            <li
              key={name}
              className={`${styles.category} ${activeIndex === i ? 'active' : ''}`}
            >
              <div onClick={() => handleClick(i)}>
                <Category name={name} subcategories={subcategories} />
              </div>

              {subcategories.length > 0 && (
                <Subcategory
                  subcategories={subcategories}
                  setGetSubcategory={setGetSubcategory}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductCategory;
