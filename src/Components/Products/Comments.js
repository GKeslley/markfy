import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_PRODUCT_POST } from '../../Api/api';
import { Link } from 'react-router-dom';
import styles from '../../Css/Products/Comments.module.css';
import ReplyComment from './ReplyComment';
import { ReactComponent as Seta } from '../../Assets/seta.svg';
import Input from '../Form/Input';
import useValidate from '../../Hooks/useValidate';
import Button from '../Reusable/Button';

const Comments = ({ userData, allComments, authorPost, slug, sellProduct }) => {
  const { request, loading } = useFetch();
  const [commentActive, setCommentActive] = React.useState(null);

  const [allReplies, setAllReplies] = React.useState([]);
  const [newComment, setNewComment] = React.useState([]);

  const commentValue = useValidate(false);

  const commentData = {
    data: () => {
      return userData
        ? {
            author: userData.nome,
            content: commentValue.value,
            idPost: slug,
            idUser: userData.usuario_id,
          }
        : null;
    },
  };

  const sendNewComment = (commentData) => {
    const { comment_date } = commentData;
    const date = comment_date.split(' ')[0].split('-').reverse().join('/');
    commentData.comment_date = date;
    setNewComment([...newComment, commentData]);
  };

  const postComments = async (event) => {
    event.preventDefault();
    if (commentValue.validate(true) && userData) {
      const token = localStorage.getItem('token');
      const { url, options } = COMMENT_PRODUCT_POST(commentData.data(), token);
      const { json } = await request(url, options);
      commentValue.setValue('');
      sendNewComment(json);
    }
  };

  const handleReplyComment = (index) => {
    setCommentActive(index);
  };

  const ownerOfThePost = userData && authorPost === userData.usuario_id;

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
              {...commentValue}
            />
            {loading ? <Button>Carregando...</Button> : <Button>Perguntar</Button>}
          </>
        )}
        <p>Últimas perguntas feitas</p>
      </form>

      {userData && (
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

          {allComments.slice(0, 7).map((comment, i) => (
            <li
              className={`${styles.comment} ${
                typeof commentActive === 'number'
                  ? commentActive === i
                    ? 'active'
                    : 'none'
                  : ''
              }`}
              key={comment.comment_id}
            >
              <div className={styles['comment-author']}>
                {userData.usuario_id === authorPost && (
                  <Link to={`/usuario/${comment.comment_author_ID}`}>
                    {comment.comment_author}
                  </Link>
                )}
                <span>
                  {comment.comment_date.split(' ')[0].split('-').reverse().join('/')}
                </span>
              </div>

              <div className={styles['comment-content']}>
                <p>{comment.comment_content}</p>
                {comment.comment_reply ||
                allReplies.find((reply) => reply.parent_id === +comment.comment_id) ? (
                  <div className={styles.reply}>
                    <Seta />
                    <p>
                      {comment.comment_reply}
                      {allReplies
                        .filter((reply) => reply.parent_id === +comment.comment_id)
                        .map((reply) => reply.comment_reply)}
                    </p>
                  </div>
                ) : null}

                {ownerOfThePost &&
                  !comment.comment_reply &&
                  !allReplies.find(
                    (reply) => reply.parent_id === +comment.comment_id,
                  ) && (
                    <span
                      className={styles['reply-comment']}
                      onClick={() => handleReplyComment(i)}
                    >
                      Responder
                    </span>
                  )}
              </div>

              {commentActive === i && (
                <ReplyComment
                  setCommentActive={setCommentActive}
                  setAllReplies={setAllReplies}
                  commentID={comment.comment_id}
                  userData={userData}
                  slug={slug}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default Comments;
