import React from 'react';
import { Link } from 'react-router-dom';

const Subcategory = ({ subcategories, setGetSubcategory }) => {
  const [activeIndex, setActiveIndex] = React.useState();

  const handleClick = (index, name, endpoint) => {
    setActiveIndex(index);
    const clearName = () => {
      setGetSubcategory({ subcategory: name, endpoint });
    };
    clearName();
  };

  return (
    <>
      <ul className="category_subcategory">
        {subcategories.length &&
          subcategories.map(({ name, endpoint }, i) => (
            <li
              key={name}
              title={name}
              className={`category_subcategory_title ${
                i === activeIndex ? 'active' : ''
              }`}
              onClick={() => handleClick(i, name, endpoint)}
            >
              <Link to="../form">{name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Subcategory;
