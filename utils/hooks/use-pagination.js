import { useCallback, useMemo, useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const prevPage = useCallback(() => {
    setPage(prevPage => {
      const nextPage = prevPage - 1;
      return nextPage <= 1 ? 1 : nextPage;
    });
  }, []);

  const nextPage = useCallback(() => {
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      return nextPage >= totalPage ? totalPage : nextPage;
    });
  }, [totalPage]);

  const toPage = useCallback(page => {
    setPage(page);
  }, []);

  const _return = useMemo(() => {
    return {
      page,
      limit,
      totalPage,
      prevPage,
      nextPage,
      toPage,
      setTotalPage,
      setLimit,
    };
  }, [page, limit, totalPage, prevPage, nextPage, toPage, setTotalPage, setLimit]);

  return _return;
};

export default usePagination;
