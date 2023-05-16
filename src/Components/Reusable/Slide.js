import React from 'react';
import styles from '../../Css/ReusablesCss/Slide.module.css';
import { debounce } from 'lodash';

const Slide = ({ imgs }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(1);
  const [slideTransform, setTransform] = React.useState(100);
  const [mouseOver, setMouseOver] = React.useState(false);
  const [touchMoveEnabled, setTouchMoveEnabled] = React.useState(false);

  const [touchCoordinates, setTouchCoordinates] = React.useState({
    touchStartX: null,
    touchMoveX: null,
    coord: null,
  });
  const timeoutMoveSlide = React.useRef();
  const SlideContentRef = React.useRef();

  const imagesSrc = imgs.reduce((acc, actual, i) => {
    const obj = {};
    obj['img'] = { src: actual, id: i };
    acc[i] = obj;
    return acc;
  }, []);

  const imagesLength = imagesSrc.slice(1, -1).length;
  const maxMove = (currentSlideIndex + 1) * 100;

  const passSlideFromButton = (index) => {
    setCurrentSlideIndex(index);
  };

  const handleTouchStart = (event) => {
    setTouchMoveEnabled(true);
    const coord = event.touches[0].clientX;
    setTouchCoordinates({ ...touchCoordinates, touchStartX: coord });
    // outras ações que você deseja executar no onTouchStart
  };

  const handleTouchEnd = (event) => {
    if (touchCoordinates.coord === 'right' && slideTransform % 100 !== 0) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else if (touchCoordinates.coord === 'left' && slideTransform % 100 !== 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleTouchMove = (event) => {
    const coord = event.touches[0].clientX;

    setTouchCoordinates({
      ...touchCoordinates,
      touchMoveX: coord,
      coord:
        touchCoordinates.touchStartX < touchCoordinates.touchMoveX ? 'left' : 'right',
    });

    if (touchMoveEnabled && touchCoordinates.coord) {
      if (touchCoordinates.coord === 'left') {
        setTransform((prev) => prev - 1);
      } else if (touchCoordinates.coord === 'right') {
        setTransform((prev) => prev + 1);
      }

      if (slideTransform >= maxMove) {
        setTransform(maxMove);
      }
    }
  };

  React.useEffect(() => {
    if (!mouseOver) {
      timeoutMoveSlide.current = setTimeout(() => {
        setCurrentSlideIndex((prev) => {
          if (prev < imagesLength + 1) {
            return prev + 1;
          } else return 0;
        });
      }, 3000);
    }

    const transitionInfinite = setTimeout(() => {
      if (currentSlideIndex === imagesLength + 1) {
        SlideContentRef.current.style.transition = 'none';
        setCurrentSlideIndex(1);
      } else if (currentSlideIndex === 0) {
        SlideContentRef.current.style.transition = 'none';
        setCurrentSlideIndex(imagesLength);
      }
    }, 400);

    const transitionAll = setTimeout(() => {
      if (currentSlideIndex !== imagesLength + 1 && currentSlideIndex !== 0) {
        SlideContentRef.current.style.transition = '0.4s';
      }
    }, 100);

    setTransform(currentSlideIndex * 100);

    return () => {
      clearTimeout(timeoutMoveSlide.current);
      clearTimeout(transitionInfinite);
      clearTimeout(transitionAll);
    };
  }, [currentSlideIndex, imagesLength, mouseOver]);

  return (
    <section
      className={styles.content}
      onMouseOver={() => {
        if (!touchMoveEnabled) setMouseOver(true);
      }}
      onMouseLeave={() => setMouseOver(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.points}>
        {imagesSrc.slice(1, -1).map(({ img }, i) => (
          <span
            key={img.id}
            onClick={() => passSlideFromButton(i + 1)}
            className={currentSlideIndex === i + 1 ? 'active' : ''}
          ></span>
        ))}
      </div>
      <ul
        className={styles.slideItems}
        style={{ transform: `translateX(-${slideTransform}%)` }}
        ref={SlideContentRef}
      >
        <li data-index="-1">
          <img src={imagesSrc[0].img.src} alt="imagem" />
        </li>

        {imagesSrc.slice(1, -1).map(({ img }, i) => (
          <li
            key={img.id}
            data-index={img.id}
            className={currentSlideIndex === i ? 'active' : ''}
          >
            <img src={img.src} alt={img.src} />
          </li>
        ))}

        <li data-index={imagesSrc[imagesSrc.length - 1].img.id}>
          <img src={imagesSrc[imagesSrc.length - 1].img.src} alt="imagem" />
        </li>
      </ul>
    </section>
  );
};

export default Slide;
