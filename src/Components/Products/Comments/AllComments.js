import React from 'react';
import styles from '../../../Css/Products/Comments.module.css';
import { Link } from 'react-router-dom';
import ReplyComment from '../ReplyComment';
import { ReactComponent as Arrow } from '../../../Assets/seta.svg';

const AllComments = (props) => {
  const [commentActive, setCommentActive] = React.useState(null);
  console.log(props);
  const ownerOfThePost = props.userData && props.authorPost === props.userData.usuario_id;

  const handleReplyComment = (index) => {
    setCommentActive(index);
  };

  if (!props.allComments.length) return null;
  return (
    <>
      {props.allComments.map((comment, i) => (
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
            {props.userData && props.userData.usuario_id === props.authorPost && (
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
            props.allReplies.find((reply) => reply.parent_id === +comment.comment_id) ? (
              <div className={styles.reply}>
                <Arrow />
                <p>
                  {comment.comment_reply}
                  {props.allReplies
                    .filter((reply) => reply.parent_id === +comment.comment_id)
                    .map((reply) => reply.comment_reply)}
                </p>
              </div>
            ) : null}

            {ownerOfThePost &&
              !comment.comment_reply &&
              !props.allReplies.find(
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
              setAllReplies={props.setAllReplies}
              commentID={comment.comment_id}
              userData={props.userData}
              slug={props.slug}
            />
          )}
        </li>
      ))}
    </>
  );
};

export default AllComments;
