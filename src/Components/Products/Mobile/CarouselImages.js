import { motion } from 'framer-motion';
import React from 'react';
import styles from '../../../Css/Products/Mobile/CarouselImages.module.css';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const CarouselImages = ({ images }) => {
  const [[page, direction], setPage] = React.useState([0, 0]);
  const [index, setIndex] = React.useState(0);

  const paginate = (newDirection) => {
    if (page >= 0 && page <= images.length - 1) {
      setPage([page + newDirection, newDirection]);
    }
  };

  return (
    <div className={styles.carousel}>
      <ul className={styles.carouselContent}>
        <li className={styles.dragger}>
          <picture>
            <motion.img
              key={page}
              src={images[+index].src}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                  setIndex((prev) => {
                    if (prev >= 0 && prev < images.length - 1) {
                      return prev + 1;
                    }
                    return prev;
                  });
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                  setIndex((prev) => {
                    if (prev > 0 && prev <= images.length - 1) {
                      return prev - 1;
                    }
                    return prev;
                  });
                }
              }}
            />
          </picture>
        </li>
      </ul>
    </div>
  );
};

export default CarouselImages;
