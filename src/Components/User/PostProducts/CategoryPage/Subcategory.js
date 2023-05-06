import React from 'react';
import { Link } from 'react-router-dom';

const toEndpoint = (str) => {
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

const Subcategory = ({ subcategories, setGetSubcategory }) => {
  const [activeIndex, setActiveIndex] = React.useState();

  const handleClick = (index, name) => {
    setActiveIndex(index);
    const clearName = () => {
      const endpoint = toEndpoint(name);
      setGetSubcategory({ subcategory: name, endpoint });
    };
    clearName();
  };

  return (
    <>
      <ul className="category_subcategory">
        {subcategories.length &&
          subcategories.map((category, i) => (
            <li
              key={category}
              title={category}
              className={`category_subcategory_title ${
                i === activeIndex ? 'active' : ''
              }`}
              onClick={() => handleClick(i, category)}
            >
              <Link to="../form">{category}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Subcategory;
