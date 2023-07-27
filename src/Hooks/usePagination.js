import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = (itemsPerPage) => {
  const { search } = useLocation();
  const paramsURL = React.useMemo(() => new URLSearchParams(search), [search]);
  const pageParam = paramsURL.get('_page');
  const initialPage = +pageParam || 1;
  const [actualPage, setActualPage] = React.useState(initialPage);
  const [totalItems, setTotalItems] = React.useState(null);
  const [order, setOrder] = React.useState({ order: '', change: false });

  const maxPage = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate();

  const newUrl = React.useCallback(
    (page) => {
      paramsURL.set('_page', page);
      paramsURL.set('_order', order.order);
      const newOrder = new URLSearchParams(search);
      console.log(newOrder.get('_order'));
      console.log(paramsURL.get('_order'));
      if (order.order || newOrder.get('_order')) {
        paramsURL.set('_order', order.order || newOrder.get('_order'));
      } else paramsURL.delete('_order');
      return `${window.location.pathname}?${paramsURL.toString()}`;
    },
    [order, paramsURL, search],
  );

  React.useEffect(() => {
    if (order.change) {
      setActualPage(1);
      setOrder({ ...order, change: false });
      navigate(newUrl(1));
    }
  }, [initialPage, navigate, newUrl, order]);

  React.useEffect(() => {
    setActualPage(initialPage);
  }, [initialPage]);

  const handlePageProx = () => {
    setActualPage(actualPage + 1);
    navigate(newUrl(actualPage + 1));
  };

  const handlePageAnt = () => {
    setActualPage(actualPage - 1);
    navigate(newUrl(actualPage - 1));
  };

  return {
    actualPage,
    setActualPage,
    maxPage,
    setTotalItems,
    totalItems,
    handlePageProx,
    handlePageAnt,
    order,
    setOrder,
  };
};

export default usePagination;
