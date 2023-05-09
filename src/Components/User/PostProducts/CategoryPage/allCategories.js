export const allCategories = () => {
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
