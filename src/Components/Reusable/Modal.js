import React from 'react';
import styles from '../../Css/ReusablesCss/Modal.module.css';
import { BsArrowLeft } from 'react-icons/bs';
import useOutsideClick from '../../Hooks/useOutsideClick';

const Modal = ({ children, active = false, setActive, title, className }) => {
  const refModal = React.useRef();
  useOutsideClick(refModal, () => setActive(false));

  if (!active) return null;
  return (
    <dialog className={styles['modal-bg']}>
      <div className={`${styles.modal} ${className ? className : ''}`} ref={refModal}>
        <div className={styles.title}>
          <span onClick={() => setActive(false)}>
            <BsArrowLeft strokeWidth={0.8} />
          </span>
          {title && <h1>{title}</h1>}
        </div>

        {children}
      </div>
    </dialog>
  );
};

export default Modal;
