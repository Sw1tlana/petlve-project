import { useEffect } from 'react';
import style from '../../scss/components/_noticesList.module.scss';
import LearnMore from '../LearnMore/LearnMore';
import { fetchNotices } from '../../reduce/notices/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedINotices, 
          selectItemsNotices, 
          selectLimit, 
          selectPage, 
          selectTotalPages} from '../../reduce/notices/selectors';
import { AppDispatch } from '../../reduce/store';
import icons from '../../shared/icons/sprite.svg';
import { addViewedItems, Pet, setPage } from '../../reduce/notices/slice';
import Pagination from '../../shared/components/Pagination/Pagination';
import Loader from '../../shared/components/Loader.tsx/Loader';

function NoticesList ( ) {
    const loading = useSelector(selectIsLoggedINotices);
    const notices = useSelector(selectItemsNotices);

      const page = useSelector(selectPage);
      const limit = useSelector(selectLimit);
      const totalPages = useSelector(selectTotalPages)?? 1;

    const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  dispatch(fetchNotices({ page: page.toString(), limit: limit.toString() }));
}, [dispatch, page, limit]);

const handleAddViewedItem = (pet: Pet) => {
  dispatch(addViewedItems(pet)); 
};

const handlePageChange = (newPage: number) => {
  dispatch(setPage(newPage));
};

  return (
    <section> 
      {loading && <Loader/>}
      {!loading && Array.isArray(notices) && notices.length > 0 && (
      <>
        <ul className={style.noticesList}>   
        {notices.map((noticeItem: Pet, index: number) => {
          if (!noticeItem._id) {
            console.warn("Пропущено елемент без _id:", noticeItem);
            return null;
          }

          return (
            <li className={style.noticesItem} key={`${noticeItem._id}-${index}`}>
              <img
                src={noticeItem.imgURL}
                alt={noticeItem.title}
                className={style.noticesImage}
                width={300}
              />
              <div className={style.containerTitle}>
                <p className={style.noticesTitle}>{noticeItem.title}</p>
                <p className={style.noticesPopular}>{noticeItem.popularity}</p>
                <svg width={16} height={16} className={style.iconStar}>
                  <use xlinkHref={`${icons}#icon-star`} />
                </svg>
              </div>
              <div className={style.containerInfo}>
                <p className={style.description}>
                  <span className={style.spanDescription}>Name</span>
                  {noticeItem.name}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Birthday</span>
                  {noticeItem.birthday}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Sex</span>
                  {noticeItem.sex}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Species</span>
                  {noticeItem.species}
                </p>
                <p className={style.description}>
                  <span className={style.spanDescription}>Category</span>
                  {noticeItem.category}
                </p>
              </div>
              <p className={style.comment}>{noticeItem.comment}</p>
              <p className={style.price}>${noticeItem.price}</p>

              <div>
                <LearnMore 
                  notice={noticeItem} 
                  isBurgerMenu={false} 
                  onViewed={handleAddViewedItem} 
                />
              </div>
            </li>
          );
        })}
        </ul>
         <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}/>
        </>
      )}
    </section>
  )
};

export default NoticesList;
