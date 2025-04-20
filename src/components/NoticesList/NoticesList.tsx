import { useEffect } from 'react';
import style from '../../scss/components/_noticesList.module.scss';
import Loader from '../../shared/components/Loader.tsx/Loader';
import LearnMore from '../LearnMore/LearneMore';
import { fetchNotices } from '../../reduce/notices/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedINotices, selectItemsNotices } from '../../reduce/notices/selectors';
import { AppDispatch } from '../../reduce/store';
import icons from '../../shared/icons/sprite.svg';
import { NoticesResponse } from '../../reduce/notices/slice';

function NoticesList() {
    const loading = useSelector(selectIsLoggedINotices);
    const notices = useSelector(selectItemsNotices);

    const dispatch = useDispatch<AppDispatch>();

    const safeId = (id: unknown): string => {
      if (typeof id === 'string') return id;
    
      if (
        typeof id === 'object' &&
        id !== null &&
        '$oid' in id &&
        typeof (id as { $oid: unknown }).$oid === 'string'
      ) {
        return (id as { $oid: string }).$oid;
      }
    
      return String(id); 
    };


useEffect(() => {
  dispatch(fetchNotices());
}, [dispatch]);

  return (
    <div>
      {!loading && Array.isArray(notices) && notices.length === 0 && <Loader />}
      
      {!loading && Array.isArray(notices) && notices.length > 0 && (
        <ul className={style.noticesList}>
          {notices.map((noticeItem: NoticesResponse) => {
            const id = safeId(noticeItem._id);

            return (
              <li className={style.noticesItem} key={safeId(noticeItem._id)}>
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
                  <LearnMore notice={noticeItem} isBurgerMenu={false} petId={id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  )
};

export default NoticesList;
