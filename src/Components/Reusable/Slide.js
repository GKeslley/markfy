import React from 'react';
import { register } from 'swiper/element/bundle';
import styles from '../../Css/ReusablesCss/Slide.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/element/css/navigation';
import 'swiper/element/css/pagination';
import 'swiper/element/css/scrollbar';
import 'swiper/element/css/autoplay';
import useMedia from '../../Hooks/useMedia';
import Button from '../Reusable/Button';

register();

const Slide = ({ imgs }) => {
  const matchMobile = useMedia('(max-width: 830px)');
  return (
    <section className={styles.content}>
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 99999,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles['slide-elements']}
      >
        {imgs.map(({ src, alt, mobile, text }) => (
          <SwiperSlide key={text} className={styles.slide}>
            <div style={{ width: '100%' }}>
              <div className={styles['slide-text']}>
                <p>{text}</p>
                <Button className="button-outline">Buscar</Button>
              </div>
              <img
                src={!matchMobile ? src : mobile}
                alt={alt}
                width="1600"
                height="300"
              />
              ) )
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slide;
