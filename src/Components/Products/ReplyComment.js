import React from 'react';
import Button from '../../Components/Reusable/Button';
import styles from '../../Css/Products/ReplyComments.module.css';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_PRODUCT_POST } from '../../Api/api';
import Input from '../Form/Input';
import useValidate from '../../Hooks/useValidate';

const ReplyComment = ({ setCommentActive, setAllReplies, commentID, userData, slug }) => {
  const { request, loading } = useFetch();
  const replyInput = useValidate(false);

  const handleCancelReply = () => {
    setCommentActive(null);
  };

  const sendReply = async (event) => {
    event.preventDefault();

    const commentData = {
      author: userData.nome,
      commentParentID: +commentID,
      content: replyInput.value,
      idPost: slug,
      idUser: userData.usuario_id,
    };

    const token = localStorage.getItem('token');
    const { url, options } = COMMENT_PRODUCT_POST(commentData, token);
    const { json } = await request(url, options);
    setAllReplies((prev) => [...prev, json]);
    handleCancelReply();
  };

  return (
    <form className={styles['reply-content']} onSubmit={sendReply}>
      <Input
        type="text"
        name="reply"
        label={false}
        maxLength={280}
        placeholder="Escreva sua resposta"
        {...replyInput}
      />
      <div>
        <p onClick={handleCancelReply}>Cancelar</p>
        {loading ? <Button>Carregando...</Button> : <Button>Responder</Button>}
      </div>
    </form>
  );
};

export default ReplyComment;
