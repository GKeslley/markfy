import React from 'react';
import Slide from '../Reusable/Slide';
import HomeProducts from './HomeProducts';
import styles from '../../Css/Home/Home.module.css';
import HomeBanner from './HomeBanner';
import Layers from './Layers';
import HomePromotion from './HomePromotion';
import NotebookImage from '../../Assets/Slide/notebook.png';
import NotebookImageMobile from '../../Assets/Slide/notebookMobile.png';
import ShoeImage from '../../Assets/Slide/shoe.png';
import ShoeImageMobile from '../../Assets/Slide/shoeMobile.png';
import HealthImage from '../../Assets/Slide/saude.png';
import HealthImageMobile from '../../Assets/Slide/saudeMobile.png';

const imgs = [
  {
    src: NotebookImage,
    alt: 'Notebook preto',
    mobile: NotebookImageMobile,
    text: 'Novas Tecnologias Na Markfy',
  },
  {
    src: ShoeImage,
    alt: 'Tênis da Nike verde',
    mobile: ShoeImageMobile,
    text: 'Descubra As Novas Tendências',
  },
  {
    src: HealthImage,
    alt: 'Frascos de remédio e ervas',
    mobile: HealthImageMobile,
    text: 'Cuide De Sua Saúde',
  },
];

const Home = () => {
  return (
    <section className={styles.home}>
      <Slide imgs={imgs} />
      <div className="container">
        <Layers />
        <HomeBanner />
        <HomeProducts
          title="Top Smartphones Vendidos Pela Markfy"
          dataProduct={{ category: 'eletronicos', subcategory: 'celulares_e_telefones' }}
        />
        <HomePromotion
          product="Móveis"
          dataProduct={{ category: 'casa', subcategory: 'moveis' }}
        />
        <HomeProducts
          title="Adquira As Novas Tendências De Moda"
          dataProduct={{ category: 'eletronicos', subcategory: 'celulares_e_telefones' }}
        />
        <picture className={styles.img}></picture>
      </div>
    </section>
  );
};

export default Home;
