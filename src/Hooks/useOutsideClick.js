import React from 'react';

const useOutsideClick = (targetElement, callback) => {
  React.useEffect(() => {
    const outsideClick = ({ target: targetWindow }) => {
      if (targetWindow.classList.contains('ignore-click-outside')) return null;

      if (targetElement.current && !targetElement.current.contains(targetWindow)) {
        callback();
      }
    };

    document.documentElement.addEventListener('click', outsideClick);

    return () => {
      document.documentElement.removeEventListener('click', outsideClick);
    };
  }, [targetElement, callback]);
};

export default useOutsideClick;
