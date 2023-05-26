import React from 'react';
import Button from '../../Components/Reusable/Button';
import styles from '../../Css/Products/ReplyComments.module.css';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_PRODUCT_POST } from '../../Api/api';

const ReplyComment = ({
  setCommentActive,
  setReplyValue,
  setAllReplies,
  replyValue,
  commentID,
  userData,
  slug,
}) => {
  const { request, loading } = useFetch();

  const handleCancelReply = () => {
    setCommentActive(null);
  };

  console.log(commentID);

  const handleChange = ({ target }) => {
    setReplyValue(target.value);
  };

  const sendReply = async (event) => {
    event.preventDefault();

    const commentData = {
      author: userData.nome,
      commentParentID: +commentID,
      content: replyValue,
      idPost: slug,
      idUser: userData.usuario_id,
    };

    const token = localStorage.getItem('token');
    const { url, options } = COMMENT_PRODUCT_POST(commentData, token);
    await request(url, options);
    setAllReplies((prev) => [
      ...prev,
      { comment_reply: replyValue, parent_id: +commentID },
    ]);
    handleCancelReply();
  };

  return (
    <form className={styles.replyContent} onSubmit={sendReply}>
      <input
        type="text"
        name="reply"
        id="reply"
        placeholder="Escreva sua resposta"
        onChange={handleChange}
        maxLength={280}
      />
      <div>
        <p onClick={handleCancelReply}>Cancelar</p>
        {loading ? <Button>Carregando...</Button> : <Button>Responder</Button>}
      </div>
    </form>
  );
};

export default ReplyComment;
