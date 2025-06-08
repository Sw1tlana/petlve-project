import style from '../../../scss/components/_pagination.module.scss';
import icons from '../../icons/sprite.svg';
import clsx from 'clsx';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ totalPages, onPageChange, currentPage }: PaginationProps) {
    const getPages = () => {
     const pages = [];

     for(let i = 1; i <= totalPages; i++) {
      pages.push(i);
     }
     return pages;
    };
    const handlePrevious = () => {
       if(currentPage > 1) {
        onPageChange(currentPage -1);
       }
    };

    const handleNext = () => {
        if(currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

  return (
    <div className={style.containerSlider}>

      <svg 
      onClick={handlePrevious} 
      width={44} height={44} 
      className={clsx(style.iconParagrapf, {
        [style.disabled]: currentPage === 1,
        [style.activeLeft]: currentPage > 1,  
      })}
      style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}>
        <use xlinkHref={`${icons}#icon-slider-left-two`} />
      </svg>

      <svg 
      onClick={handlePrevious} 
      width={44} height={44} 
      className={clsx(style.iconParagrapf, {
        [style.disabled]: currentPage === 1,
        [style.activeLeft]: currentPage > 1, 
      })}
      style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}>
        <use xlinkHref={`${icons}#icon-slider-left`} />
      </svg>

    <div className={style.paginationContainer}>
        {getPages().map((page) => (
            <button
            key={page}
            className={clsx(style.pageCircle, {
              [style.activeCircle]: page === currentPage, 
          })}
          onClick={() => {
            console.log(`Зміна сторінки на: ${page}`); 
            onPageChange(page);
        }}>
              {page}
            </button>
        ))}
    </div>
    
      <svg
      onClick={handleNext} 
      width={44} height={44} 
      className={clsx(style.iconParagrapf, {
        [style.disabled]: currentPage === totalPages,
        [style.activeRight]: currentPage < totalPages, 
      })}>
         <use xlinkHref={`${icons}#icon-slider-right`} />
      </svg>

       <svg
       onClick={handleNext}  
       width={44} height={44} 
       className={clsx(style.iconParagrapf, {
        [style.disabled]: currentPage === totalPages,
        [style.activeRight]: currentPage < totalPages, 
      })}>
          <use xlinkHref={`${icons}#icon-slider-right-two`} />
      </svg>
    </div>
  )
};

export default Pagination;