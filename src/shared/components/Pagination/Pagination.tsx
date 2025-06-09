import style from '../../../scss/components/_pagination.module.scss';
import clsx from 'clsx';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ totalPages, onPageChange, currentPage }: PaginationProps) {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleFirst = () => currentPage !== 1 && onPageChange(1);
  const handlePrevious = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);
  const handleLast = () => currentPage !== totalPages && onPageChange(totalPages);

  return (
    <div className={style.pagination}>
      <button
        type='button'
        onClick={handleFirst}
        disabled={currentPage === 1}
        className={`${style.arrow}`}
      >
        {'«'}
      </button>

      <button
        type='button'
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`${style.arrow}`}
      >
        {'‹'}
      </button>

      {getPages().map((page) => (
        <button
          type='button'
          key={page}
          className={clsx(style.pageButton, {
            [style.active]: page === currentPage,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type='button'
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${style.arrow}`}
      >
        {'›'}
      </button>

      <button
        type='button'
        onClick={handleLast}
        disabled={currentPage === totalPages}
        className={`${style.arrow}`}
      >
        {'»'}
      </button>
    </div>
  );
}

export default Pagination;