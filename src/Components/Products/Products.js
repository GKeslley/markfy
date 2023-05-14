import React from 'react';
import Slide from '../Reusable/Slide';
import Imagem1 from '../../Assets/Slide/capa1.png';
import Imagem2 from '../../Assets/Slide/capa2.png';
import Imagem3 from '../../Assets/Slide/capa3.png';

const Products = () => {
  return (
    <div>
      <Slide imgs={[Imagem3, Imagem1, Imagem2, Imagem3, Imagem1]} />
    </div>
  );
};

export default Products;
