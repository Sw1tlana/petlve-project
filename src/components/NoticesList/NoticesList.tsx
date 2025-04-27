import { useEffect } from 'react';
import style from '../../scss/components/_noticesList.module.scss';
import LearnMore from '../LearnMore/LearnMore';
import { fetchNotices } from '../../reduce/notices/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedINotices, selectItemsNotices } from '../../reduce/notices/selectors';
import { AppDispatch } from '../../reduce/store';
import icons from '../../shared/icons/sprite.svg';
import { Pet } from '../../reduce/notices/slice';

function NoticesList() {
    const loading = useSelector(selectIsLoggedINotices);
    const notices = useSelector(selectItemsNotices);
    console.log(typeof notices);

    const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(fetchNotices());
}, [dispatch]);  

  return (
    <div> 
      
      {!loading && Array.isArray(notices) && notices.length > 0 && (
        <ul className={style.noticesList}>   
          {notices.map((noticeItem: Pet, index: number) => {
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
                  <LearnMore notice={noticeItem} isBurgerMenu={false}/>
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
