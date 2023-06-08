import React from 'react';
import { useLocation } from 'react-router-dom';

const usePagination = () => {
  const { search } = useLocation();
  const paramsURL = new URLSearchParams(search);
  const pageParam = paramsURL.get('_page');
  const initialPage = Number(pageParam) || 1;

  const [actualPage, setActualPage] = React.useState(initialPage);
  const [totalPages, setTotalPages] = React.useState(1);
  const [order, setOrder] = React.useState('');

  if (order) {
    paramsURL.set('_order', order);
  } else {
    paramsURL.delete('_order');
  }
  paramsURL.set('_page', actualPage);
  let newUrl = `${window.location.pathname}?${paramsURL.toString()}`;

  React.useEffect(() => {
    setActualPage(1);
  }, [order]);

  React.useEffect(() => {
    console.log('teste');
    setActualPage(initialPage);
  }, [initialPage]);

  const handlePageProx = () => {
    setActualPage(actualPage + 1);
  };

  const handlePageAnt = () => {
    setActualPage(actualPage - 1);
  };

  return {
    actualPage,
    setActualPage,
    setTotalPages,
    totalPages,
    newUrl,
    handlePageProx,
    handlePageAnt,
    order,
    setOrder,
  };
};

export default usePagination;
