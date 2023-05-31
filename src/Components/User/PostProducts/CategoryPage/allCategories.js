import {
  AiOutlineHeart,
  AiOutlineCar,
  AiOutlineHome,
  AiOutlineMobile,
} from 'react-icons/ai';
import { BiLeaf, BiBaseball } from 'react-icons/bi';
import { IoShirtOutline } from 'react-icons/io5';

export const allCategories = () => {
  const categories = [
    {
      name: 'Saúde',
      subcategories: [],
      endpoint: 'saude',
      img: {
        src: <AiOutlineHeart />,
        alt: 'Coração',
      },
    },
    {
      name: 'Auto peças',
      subcategories: [
        'Carros, vans e utilitários',
        'Motos',
        'Ônibus',
        'Caminhões',
        'Barcos e aeronaves',
        'Acessórios',
      ],
      endpoint: 'auto_pecas',
      img: {
        src: <AiOutlineCar />,
        alt: 'Carro',
      },
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
      img: {
        src: <AiOutlineHome />,
        alt: 'Casa',
      },
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
      img: {
        src: <AiOutlineMobile />,
        alt: 'Celular',
      },
    },
    {
      name: 'Agro e indústria',
      subcategories: [],
      endpoint: 'agro_industria',
      img: {
        src: <BiLeaf />,
        alt: 'Folha',
      },
    },
    {
      name: 'Esportes e lazer',
      subcategories: ['Esportes e ginástica', 'Ciclismo'],
      endpoint: 'esportes_lazer',
      img: {
        src: <BiBaseball />,
        alt: 'Bola de beisebol',
      },
    },
    {
      name: 'Moda',
      subcategories: ['Roupas e calçados', 'Bijouterias e acessórios'],
      endpoint: 'moda',
      img: {
        src: <IoShirtOutline />,
        alt: 'Camisa',
      },
    },
  ];
  return categories;
};

export const toEndpoint = (str) => {
  const map = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    õ: 'o',
    ú: 'u',
    ñ: 'n',
    ç: 'c',
    ã: 'a',
  };
  return str
    .toLowerCase()
    .split('')
    .map((char) => map[char] || char)
    .join('')
    .replace(/ /g, '_')
    .replace(/,/g, '');
};
