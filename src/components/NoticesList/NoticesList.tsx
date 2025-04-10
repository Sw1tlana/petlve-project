import { useEffect } from 'react';
import style from '../../scss/components/_noticesList.module.scss';
import Loader from '../../shared/components/Loader.tsx/Loader';
import LearneMore from '../LearnMore/LearneMore';
import { fetchNotices } from '../../reduce/notices/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedINotices, selectItemsNotices } from '../../reduce/notices/selectors';
import { AppDispatch } from '../../reduce/store';
import icons from '../../shared/icons/sprite.svg';

interface Notices {
  _id: string;
  species: string;
  category: string;
  price: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  popularity: number;
};

function NoticesList() {
    const loading = useSelector(selectIsLoggedINotices);
    const notices = useSelector(selectItemsNotices);

    const dispatch = useDispatch<AppDispatch>();


useEffect(() => {
  dispatch(fetchNotices());
}, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
          {!loading && Array.isArray(notices) && notices.length > 0 && (
        <ul className={style.noticesList}>
          {notices.map((noticeItem: Notices, index: number) => (
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
                    <svg 
                        width={16} 
                        height={16} 
                        className={style.iconStar}>
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
                <LearneMore notice={noticeItem} isBurgerMenu={false}/>
              </div>
            </li>
          ))}
  </ul>
)}

    </div>
  )
};

export default NoticesList;
