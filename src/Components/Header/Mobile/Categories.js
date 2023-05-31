import React from 'react';
import styles from '../../../Css/Header/Mobile/Categories.module.css';
import { allCategories } from '../../User/PostProducts/CategoryPage/allCategories';
import { motion } from 'framer-motion';

const Categories = () => {
  const categories = allCategories();
  const [Allwidth, setAllWidth] = React.useState(0);
  const carousel = React.useRef();

  React.useEffect(() => {
    setAllWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <section className={styles.carouselContent}>
      <motion.ul ref={carousel} className={styles.carousel}>
        <motion.div
          className={styles.inner}
          drag="x"
          dragConstraints={{ right: 0, left: -Allwidth }}
        >
          {categories.map(({ name, endpoint, img }) => (
            <motion.li key={endpoint} className={styles.item}>
              <picture>{img.src}</picture>
              <p>{name}</p>
            </motion.li>
          ))}
        </motion.div>
      </motion.ul>
    </section>
  );
};

export default Categories;