import React from 'react';
import ModalComments from './Comments/ModalComments';
import styles from '../../Css/Products/Modal.module.css';
import useOutsideClick from '../../Hooks/useOutsideClick';
import { BsArrowLeft } from 'react-icons/bs';

const Modal = ({
  slug,
  openModal,
  setOpenModal,
  userData,
  authorPost,
  allReplies,
  setAllReplies,
}) => {
  const [pages, setPage] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);
  const refModal = React.useRef();

  const handleClickNextPage = () => {
    if (infinite) {
      setPage((page) => [...page, +page.length + 1]);
    }
  };

  useOutsideClick(refModal, () => setOpenModal(false));

  return (
    <>
      {openModal && (
        <dialog className={`${styles.modal} modal-bg`}>
          <div className={`${styles['modal-content']} modal`} ref={refModal}>
            <div className={styles.title}>
              <span onClick={() => setOpenModal(false)}>
                <BsArrowLeft strokeWidth={0.8} />
              </span>
              <h1>Últimas Perguntas</h1>
            </div>
            <ul>
              {pages.map((page) => (
                <ModalComments
                  key={page}
                  page={page}
                  slug={slug}
                  setInfinite={setInfinite}
                  userData={userData}
                  authorPost={authorPost}
                  allReplies={allReplies}
                  setAllReplies={setAllReplies}
                />
              ))}
              {infinite && (
                <p onClick={handleClickNextPage} className={styles['element-questions']}>
                  Ver Mais Perguntas
                </p>
              )}
            </ul>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
