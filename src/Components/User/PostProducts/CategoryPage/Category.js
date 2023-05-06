import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ name, subcategories }) => {
  return (
    <>
      {subcategories.length ? <p>{name}</p> : <Link to="../form">{name}</Link>}
      <picture></picture>
    </>
  );
};

export default Category;
