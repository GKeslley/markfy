import React from 'react';
import styles from '../../Css/ReusablesCss/RequestMessage.module.css';
import { BsFillBagCheckFill } from 'react-icons/bs';

const RequestMessage = ({ notification, setNotification }) => {
  const time = React.useRef();

  const handleClick = () => {
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  handleClick();

  return (
    <>
      {
        <div className={styles.notification}>
          <p>{notification}</p>
          <BsFillBagCheckFill />
        </div>
      }
    </>
  );
};

export default RequestMessage;
