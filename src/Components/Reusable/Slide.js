import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import styles from '../../Css/ReusablesCss/Slide.module.css';
import Image from '../Helper/Image';

const Slide = ({ imgs }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideTransform, setSlideTransform] = useState(100);
  const [mouseOver, setMouseOver] = useState(false);
  const [touchMoveEnabled, setTouchMoveEnabled] = useState(false);
  const [touchCoordinates, setTouchCoordinates] = useState(false);

  const timeoutMoveSlide = useRef();
  const SlideContentRef = useRef();

  const imagesLength = imgs.length - 2;
  const maxMove = (currentSlideIndex + 1) * 100;
  const transformStyle = 'transform .3s ease, -webkit-transform .3s ease';

  const imagesSrc = imgs.map((src, i) => ({ src, id: i }));

  const passSlideFromButton = useCallback((index) => {
    setCurrentSlideIndex(index);
  }, []);

  const handleTouchStart = useCallback((event) => {
    setTouchMoveEnabled(true);
    const coord = event.touches[0].clientX;
    setTouchCoordinates({ touchStartX: coord, touchMoveX: null, coord: null });
  }, []);

  const handleTouchEnd = useCallback(() => {
    SlideContentRef.current.style.transition = transformStyle;
    setTouchMoveEnabled(false);
    if (slideTransform % 100 === 0) return null;
    if (touchCoordinates.coord === 'right') {
      setCurrentSlideIndex((prev) => prev + 1);
    } else if (touchCoordinates.coord === 'left') {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [slideTransform, touchCoordinates]);

  const handleTouchMove = useCallback(
    (event) => {
      if (currentSlideIndex === 0 || currentSlideIndex >= imagesLength + 1) {
        setCurrentSlideIndex(1);
      }

      const coord = event.touches[0].clientX;
      SlideContentRef.current.style.transition = 'none 0s ease 0s';
      const newCoordinates = {
        touchStartX: touchCoordinates.touchStartX,
        touchMoveX: coord,
        coord: touchCoordinates.touchStartX < coord ? 'left' : 'right',
      };
      setTouchCoordinates(newCoordinates);

      if (touchMoveEnabled && newCoordinates.coord) {
        setSlideTransform((prev) => {
          if (newCoordinates.coord === 'left') return prev - 1;
          if (newCoordinates.coord === 'right') return prev + 1;
          return prev;
        });

        if (slideTransform >= maxMove) {
          setSlideTransform(maxMove);
        }
      }
    },
    [
      slideTransform,
      touchCoordinates,
      touchMoveEnabled,
      maxMove,
      currentSlideIndex,
      imagesLength,
    ],
  );

  useEffect(() => {
    const handleSlideTimeout = debounce(() => {
      setCurrentSlideIndex((prev) => {
        if (prev < imagesLength + 1) return prev + 1;
        return 0;
      });
    }, 3000);

    if (!mouseOver || touchMoveEnabled) {
      timeoutMoveSlide.current = setTimeout(handleSlideTimeout, 3000);
    }

    const transitionInfinite = setTimeout(() => {
      if (currentSlideIndex === imagesLength + 1) {
        SlideContentRef.current.style.transition = 'none';
        setCurrentSlideIndex(1);
      } else if (currentSlideIndex === 0) {
        SlideContentRef.current.style.transition = 'none';
        setCurrentSlideIndex(imagesLength);
      }
    }, 300);

    const transitionAll = setTimeout(() => {
      if (currentSlideIndex !== imagesLength + 1 && currentSlideIndex !== 0) {
        SlideContentRef.current.style.transition = transformStyle;
      }
    }, 100);

    setSlideTransform(currentSlideIndex * 100);

    return () => {
      clearTimeout(timeoutMoveSlide.current);
      clearTimeout(transitionInfinite);
      clearTimeout(transitionAll);
    };
  }, [currentSlideIndex, imagesLength, mouseOver, touchMoveEnabled]);

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
        {imagesSrc.slice(1, -1).map(({ id }, i) => (
          <span
            key={id}
            onClick={() => passSlideFromButton(i + 1)}
            onTouchStart={() => passSlideFromButton(i + 1)}
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
          <Image alt="imagem" src={imagesSrc[0].src} className="container" />
        </li>

        {imagesSrc.slice(1, -1).map(({ id, src }, i) => (
          <li
            key={id}
            data-index={id}
            className={currentSlideIndex === i + 1 ? 'active' : ''}
          >
            <img src={src} alt={src} className="container" />
          </li>
        ))}

        <li data-index={imagesSrc[imagesSrc.length - 1].id}>
          <Image
            alt="imagem"
            src={imagesSrc[imagesSrc.length - 1].src}
            className="container"
          />
        </li>
      </ul>
    </section>
  );
};

export default Slide;
