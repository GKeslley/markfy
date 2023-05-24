import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_PRODUCT_POST } from '../../Api/api';
import { Link } from 'react-router-dom';
import styles from '../../Css/Products/Comments.module.css';

const Comments = ({
  userData,
  comment,
  allComments,
  authorPost,
  slug,
  sendComment,
  setSendComment,
  newComment,
}) => {
  const { request } = useFetch();

  React.useEffect(() => {
    const commentData = {
      data: () => {
        return userData
          ? {
              author: userData.nome,
              content: comment.value,
              idPost: slug,
              idUser: userData.usuario_id,
            }
          : null;
      },
    };

    if (sendComment) {
      const postComments = async () => {
        if (comment.validate(true) && userData) {
          const token = localStorage.getItem('token');
          const { url, options } = COMMENT_PRODUCT_POST(commentData.data(), token);
          await request(url, options);
          comment.setValue('');
        }
        setSendComment(false);
      };
      postComments();
    }
  }, [sendComment, comment, request, setSendComment, userData, slug]);

  if (!userData) return null;
  return (
    <>
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
            ({
              comment_author,
              comment_author_ID,
              comment_content,
              comment_date,
              comment_id,
            }) => (
              <li className={styles.comment} key={comment_id}>
                <div className={styles.commentAuthor}>
                  {userData.usuario_id === authorPost && (
                    <Link to={`/usuario/${comment_author_ID}`}>{comment_author}</Link>
                  )}
                  <span>{comment_date.split(' ')[0].split('-').reverse().join('/')}</span>
                </div>
                <p>{comment_content}</p>
              </li>
            ),
          )}
      </ul>
    </>
  );
};

export default Comments;
