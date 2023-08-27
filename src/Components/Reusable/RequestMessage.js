import React from 'react';
import styles from '../../Css/ReusablesCss/RequestMessage.module.css';
import { BsFillBagCheckFill } from 'react-icons/bs';

const RequestMessage = ({ notification, setNotification }) => {
  const time = React.useRef();

  const handleClick = () => {
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      setNotification({ error: false, message: '' });
    }, 3000);
  };
  handleClick();

  return (
    <>
      {
        <div
          className={`${styles.notification} ${notification.error ? styles.error : ''}`}
        >
          <p>{notification.message}</p>
          <BsFillBagCheckFill />
        </div>
      }
    </>
  );
};

export default RequestMessage;
