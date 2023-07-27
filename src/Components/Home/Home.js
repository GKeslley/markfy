import React from 'react';
import Slide from '../Reusable/Slide';
import Imagem1 from '../../Assets/Slide/foto.png';
import Imagem2 from '../../Assets/Slide/foto2.png';
import Imagem3 from '../../Assets/Slide/foto3.png';
import Smartphones from './Smartphones';
import ExtraInfos from './ExtraInfos';
import CategoriesHome from '../Header/CategoriesHome';

const Home = () => {
  return (
    <main>
      <Slide imgs={[Imagem3, Imagem1, Imagem2, Imagem3, Imagem1]} />
      <ExtraInfos />
      <Smartphones />
      <CategoriesHome />
    </main>
  );
};

export default Home;
