import React from 'react';
import ModalComments from './Comments/ModalComments';
import styles from '../../Css/Products/CommentsContent.module.css';
import Modal from '../Reusable/Modal';

const CommentsContent = ({
  slug,
  setOpenModal,
  openModal,
  userData,
  authorPost,
  allReplies,
  setAllReplies,
}) => {
  const [pages, setPage] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  const handleClickNextPage = () => {
    if (infinite) {
      setPage((page) => [...page, +page.length + 1]);
    }
  };

  return (
    <>
      <Modal
        active={openModal}
        setActive={setOpenModal}
        title="Últimas Perguntas"
        className={styles['modal-content']}
      >
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
      </Modal>
    </>
  );
};

export default CommentsContent;
