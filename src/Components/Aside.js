import React from 'react';
import styles from '../Css/Aside.module.css';

const Aside = ({ children }) => {
  return <aside className={styles.aside}>{children}</aside>;
};

export default Aside;
