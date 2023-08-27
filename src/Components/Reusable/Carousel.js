import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../Css/ReusablesCss/Carousel.module.css';

const Carousel = ({ children, refCarousel }) => {
  const [allwidth, setAllWidth] = React.useState(0);

  React.useEffect(() => {
    if (refCarousel.current) {
      setAllWidth(refCarousel.current.scrollWidth - refCarousel.current.offsetWidth);
    }
  }, [refCarousel]);

  return (
    <>
      <motion.div ref={refCarousel} className={styles.carousel}>
        <motion.div
          className={styles.inner}
          drag="x"
          dragConstraints={{ right: 0, left: -allwidth }}
        >
          <motion.div className={styles.item}>{children}</motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Carousel;
