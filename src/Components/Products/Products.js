import React from 'react';
import Slide from '../Reusable/Slide';
import Imagem1 from '../../Assets/Slide/img1.jpeg';
import Imagem2 from '../../Assets/Slide/img2.jpg';
import Imagem3 from '../../Assets/Slide/img3.jpeg';

const Products = () => {
  return (
    <div>
      <Slide imgs={[Imagem3, Imagem1, Imagem2, Imagem3, Imagem1]} />
    </div>
  );
};

export default Products;
