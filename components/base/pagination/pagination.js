import makeArray from '@/utils/make-array';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../button';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';

const Pagination = ({ current = 1, maxPage, minPage = 1, onChange = current => {} }) => {
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setActivePage(current);
  }, [current]);

  useEffect(() => {
    if (maxPage <= 5) {
      setPages(makeArray(maxPage, (_, i) => i + 1));
    } else if (activePage - minPage <= 3) {
      // return like this 1 2 3 [4] 5  … 200
      setPages([...makeArray(5, (_, i) => i + 1), -1, maxPage]);
    } else if (maxPage - activePage <= 3) {
      // return like this 1 … 196 [197] 198 199 200
      setPages([minPage, -1, ...makeArray(5, (_, i) => i + (maxPage - 4))]);
    } else {
      // return like this 1 … 4 [5] 6 … 200
      setPages([minPage, -1, activePage - 1, activePage, activePage + 1, -1, maxPage]);
    }
  }, [activePage, maxPage, minPage]);

  return (
    <div className="flex items-center gap-2.5 px-4 text-gray-600">
      <button
        onClick={() => {
          if (activePage > minPage) {
            setActivePage(prev => prev - 1);
            onChange(activePage - 1);
          }
        }}
      >
        <ChevronLeftIcon className={clsx(activePage === minPage && 'text-gray-300')} />
      </button>
      {pages.map((page, idx) => (
        <>
          {page > 0 ? (
            <Button
              key={`pagination${page}${idx}`}
              className="rounded-md px-3.5 py-2 !text-sm"
              type={page === activePage ? 'primary' : 'outline'}
              onClick={() => onChange(page)}
            >
              {page}
            </Button>
          ) : (
            <div>...</div>
          )}
        </>
      ))}
      <button
        onClick={() => {
          if (activePage < maxPage) {
            setActivePage(prev => prev + 1);
            onChange(activePage + 1);
          }
        }}
      >
        <ChevronRightIcon className={clsx(activePage === maxPage && 'text-gray-300')} />
      </button>
    </div>
  );
};

export default Pagination;
