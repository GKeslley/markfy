import React from 'react';
import { debounce } from 'lodash';

function ScrollTriggeredRequestComponent() {
  const [shouldFetchData, setShouldFetchData] = React.useState(false);
  const [position, setPosition] = React.useState(false);

  const triggerScrollPosition = position;

  const debouncedHandleScroll = debounce(() => {
    if (!shouldFetchData) {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition >= triggerScrollPosition) {
        setShouldFetchData(true);
      }
    }
  }, 300);

  React.useEffect(() => {
    if (position) {
      window.addEventListener('scroll', debouncedHandleScroll);
    }

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [debouncedHandleScroll, position, shouldFetchData]);

  return { shouldFetchData, setPosition };
}

export default ScrollTriggeredRequestComponent;
