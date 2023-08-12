import React from 'react';
import Slide from '../Reusable/Slide';
import Imagem1 from '../../Assets/Slide/foto.png';
import Imagem2 from '../../Assets/Slide/foto2.png';
import Imagem3 from '../../Assets/Slide/foto3.png';
import Smartphones from './Smartphones';
import ExtraInfos from './ExtraInfos';
import CategoriesHome from '../Header/CategoriesHome';
import styles from '../../Css/Home/Home.module.css';

const Home = () => {
  return (
    <section className={styles.home}>
      <Slide imgs={[Imagem3, Imagem1, Imagem2, Imagem3, Imagem1]} />
      <ExtraInfos />
      <Smartphones />
      <CategoriesHome />
    </section>
  );
};

export default Home;
