import React from 'react';
import styles from '../../Css/ReusablesCss/Spinner.module.css';

const Spinner = ({ width = '', rotate = 'initial' }) => {
  return (
    <div className={styles.spinner} style={{ transform: `rotate(${rotate})` }}>
      <div className={styles.bounce1} style={{ width: width, height: width }}></div>
      <div className={styles.bounce2} style={{ width: width, height: width }}></div>
      <div className={styles.bounce3} style={{ width: width, height: width }}></div>
    </div>
  );
};

export default Spinner;
