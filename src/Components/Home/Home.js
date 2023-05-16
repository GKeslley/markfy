import React from 'react';
import Slide from '../Reusable/Slide';
import Imagem1 from '../../Assets/Slide/capa1.png';
import Imagem2 from '../../Assets/Slide/capa2.png';
import Imagem3 from '../../Assets/Slide/capa3.png';
import Smartphones from './Smartphones';

const Home = ({ setDataProduct }) => {
  return (
    <div>
      <Slide imgs={[Imagem3, Imagem1, Imagem2, Imagem3, Imagem1]} />
      <Smartphones setDataProduct={setDataProduct} />
    </div>
  );
};

export default Home;
