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
        { endpoint: '', name: 'Carros, vans e utilitários' },
        { endpoint: '', name: 'Motos' },
        { endpoint: '', name: 'Ônibus' },
        { endpoint: '', name: 'Caminhões' },
        { endpoint: '', name: 'Barcos e aeronaves' },
        { endpoint: '', name: 'Acessórios' },
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
        { endpoint: '', name: 'Móveis' },
        { endpoint: '', name: 'Eletrodomésticos' },
        { endpoint: '', name: 'Materiais de construção' },
        { endpoint: '', name: 'Utilidades domésticas' },
        { endpoint: '', name: 'Decoração' },
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
        { endpoint: '', name: 'Videogames' },
        { endpoint: '', name: 'Computadores e acessórios' },
        { endpoint: '', name: 'Celulares e telefones' },
        { endpoint: '', name: 'Áudio, TV, vídeo' },
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
      subcategories: [
        { endpoint: '', name: 'Esportes e ginástica' },
        { endpoint: '', name: 'Ciclismo' },
      ],
      endpoint: 'esportes_lazer',
      img: {
        src: <BiBaseball />,
        alt: 'Bola de beisebol',
      },
    },
    {
      name: 'Moda',
      subcategories: [
        { endpoint: '', name: 'Roupas e calçados' },
        { endpoint: '', name: 'Bijouterias e acessórios' },
      ],
      endpoint: 'moda',
      img: {
        src: <IoShirtOutline />,
        alt: 'Camisa',
      },
    },
  ];

  categories.forEach(({ subcategories }) => {
    subcategories.forEach((item) => {
      item.endpoint = toEndpoint(item.name);
    });
  });

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
