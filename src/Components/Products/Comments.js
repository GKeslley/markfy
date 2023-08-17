import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_PRODUCT_POST } from '../../Api/api';
import styles from '../../Css/Products/Comments.module.css';
import Input from '../Form/Input';
import useValidate from '../../Hooks/useValidate';
import Button from '../Reusable/Button';
import Modal from './Modal';
import AllComments from './Comments/AllComments';
import { GlobalContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const Comments = ({ allComments, authorPost, slug, sellProduct }) => {
  const [newComment, setNewComment] = React.useState([]);
  const [allReplies, setAllReplies] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const { userData } = React.useContext(GlobalContext);
  const { request, loading } = useFetch();
  const navigate = useNavigate();

  const commentValue = useValidate(false);

  const commentData = {
    data: userData
      ? {
          author: userData.nome,
          content: commentValue.value,
          idPost: slug,
          idUser: userData.usuario_id,
        }
      : null,
  };

  const sendNewComment = (comment) => {
    const { comment_date } = comment;
    const date = comment_date.split(' ')[0].split('-').reverse().join('/');
    comment.comment_date = date;
    setNewComment([...newComment, comment]);
  };

  const postComments = async (event) => {
    event.preventDefault();
    if (!userData) {
      navigate('/login');
      return null;
    }
    if (commentValue.validate(true) && userData) {
      const token = localStorage.getItem('token');
      const { url, options } = COMMENT_PRODUCT_POST({
        body: commentData.data,
        token,
        total: '9',
      });
      const { json } = await request(url, options);
      commentValue.setValue('');
      sendNewComment(json);
    }
  };

  return (
    <article className={styles['product-asks']}>
      <h2>Perguntas e Respostas</h2>
      <form className={styles['ask-section']} onSubmit={postComments}>
        {sellProduct === 'false' && (
          <>
            <Input
              type="text"
              label="Pergunte ao vendedor"
              name="ask"
              id="ask"
              placeholder="Faça sua pergunta"
              {...commentValue}
            />
            {loading ? <Button>Carregando...</Button> : <Button>Perguntar</Button>}
          </>
        )}
        <p>Últimas perguntas feitas</p>
      </form>

      {
        <ul className={styles['comments-content']}>
          {newComment.length > 0 &&
            newComment.map(({ comment_content, comment_date }, i) => (
              <li className={styles.comment} key={i}>
                <div className={styles['comment-author']}>
                  <span>{comment_date}</span>
                </div>
                <p>{comment_content}</p>
              </li>
            ))}

          <AllComments
            allComments={allComments}
            userData={userData}
            authorPost={authorPost}
            slug={slug}
            allReplies={allReplies}
            setAllReplies={setAllReplies}
          />
        </ul>
      }

      {openModal && (
        <Modal
          slug={slug}
          openModal={openModal}
          setOpenModal={setOpenModal}
          userData={userData}
          authorPost={authorPost}
          allReplies={allReplies}
          setAllReplies={setAllReplies}
        />
      )}

      {allComments.length > 6 && (
        <p
          className={`${styles.questions} ignore-click-outside`}
          onClick={() => setOpenModal(true)}
        >
          Ver Todas as Perguntas
        </p>
      )}
    </article>
  );
};

export default Comments;
