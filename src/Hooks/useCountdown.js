import React from 'react';

const useCountdown = (future, time) => {
  const countDownDate = new Date(future).getTime();

  const [countdown, setCountdown] = React.useState(countDownDate - new Date().getTime());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countDownDate - new Date().getTime());
    }, time);

    return () => clearInterval(interval);
  }, [countDownDate, time]);

  return getReturnValues(countdown);
};

const getReturnValues = (countDown) => {
  return {
    days: days(countDown),
    hours: hours(countDown),
    minutes: minutes(countDown),
    seconds: seconds(countDown),
  };
};

const days = (countDown) => {
  return Math.floor(countDown / (24 * 60 * 60 * 1000));
};

const hours = (countDown) => {
  return Math.floor((countDown % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000));
};

const minutes = (countDown) => {
  return Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
};

const seconds = (countDown) => {
  const time = Math.floor((countDown % (1000 * 60)) / 1000);
  return time < 10 ? '0' + time : time;
};

export default useCountdown;
