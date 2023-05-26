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

const Comments = ({ userData, comment, allComments, authorPost, slug }) => {
  const { request, loading } = useFetch();
  const [commentActive, setCommentActive] = React.useState(null);
  const [replyValue, setReplyValue] = React.useState('');

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

  const sendNewComment = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    setNewComment([
      ...newComment,
      {
        comment_content: commentValue.value,
        comment_date: day + '/' + month + '/' + year,
      },
    ]);
  };

  const postComments = async (event) => {
    event.preventDefault();
    if (commentValue.validate(true) && userData) {
      const token = localStorage.getItem('token');
      const { url, options } = COMMENT_PRODUCT_POST(commentData.data(), token);
      await request(url, options);
      commentValue.setValue('');
      sendNewComment();
    }
  };

  const handleReplyComment = (index) => {
    setCommentActive(index);
  };

  const ownerOfThePost = userData && authorPost === userData.usuario_id;

  return (
    <article className={styles.productAsks}>
      <h2>Perguntas e Respostas</h2>
      <form className={styles.askSection} onSubmit={postComments}>
        <Input
          type="text"
          label="Pergunte ao vendedor"
          name="ask"
          id="ask"
          {...commentValue}
        />
        {loading ? <Button>Carregando...</Button> : <Button>Perguntar</Button>}
        <p>Últimas perguntas feitas</p>
      </form>

      {userData && (
        <ul className={styles.commentsContent}>
          {newComment.length > 0 &&
            newComment.map(({ comment_content, comment_date }, i) => (
              <li className={styles.comment} key={i}>
                <div className={styles.commentAuthor}>
                  <span>{comment_date}</span>
                </div>
                <p>{comment_content}</p>
              </li>
            ))}

          {allComments
            .slice(0, 7)
            .map(
              (
                {
                  comment_author,
                  comment_author_ID,
                  comment_content,
                  comment_date,
                  comment_id,
                  comment_reply,
                },
                i,
              ) => (
                <li
                  className={`${styles.comment} ${
                    typeof commentActive === 'number'
                      ? commentActive === i
                        ? 'active'
                        : 'none'
                      : ''
                  }`}
                  key={comment_id}
                >
                  <div className={styles.commentAuthor}>
                    {userData.usuario_id === authorPost && (
                      <Link to={`/usuario/${comment_author_ID}`}>{comment_author}</Link>
                    )}
                    <span>
                      {comment_date.split(' ')[0].split('-').reverse().join('/')}
                    </span>
                  </div>

                  <div className={styles.commentContent}>
                    <p>{comment_content}</p>
                    {(comment_reply ||
                      allReplies.some(({ parent_id }) => parent_id === +comment_id)) && (
                      <div className={styles.reply}>
                        <Seta />
                        <p>
                          {comment_reply}
                          {allReplies.map(({ comment_reply, parent_id }) =>
                            +comment_id === parent_id ? comment_reply : null,
                          )}
                        </p>
                      </div>
                    )}

                    {commentActive !== i &&
                      !comment_reply &&
                      !allReplies.some(({ parent_id }) => parent_id === +comment_id) &&
                      ownerOfThePost && (
                        <span
                          className={styles.replyComment}
                          onClick={() => handleReplyComment(i)}
                        >
                          Responder
                        </span>
                      )}
                  </div>

                  {commentActive === i && (
                    <ReplyComment
                      setCommentActive={setCommentActive}
                      replyValue={replyValue}
                      setReplyValue={setReplyValue}
                      setAllReplies={setAllReplies}
                      commentID={comment_id}
                      userData={userData}
                      slug={slug}
                    />
                  )}
                </li>
              ),
            )}
        </ul>
      )}
    </article>
  );
};

export default Comments;
