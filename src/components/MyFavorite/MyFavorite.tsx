import style from '../../scss/components/_myFavorite.module.scss';
import { selectFavoritePet } from '../../reduce/notices/selectors';
import { useSelector } from 'react-redux';
import LearneMore from '../LearnMore/LearneMore';
import { FavoriteResponse } from '../../reduce/notices/slice';
import icons from '../../shared/icons/sprite.svg';

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

function MyFavorite() {
  const favoritePets = useSelector(selectFavoritePet);

  return (
    <>
  {Array.isArray(favoritePets) && favoritePets.length > 0 && (
        <ul className={style.noticesList}>
          {favoritePets.map((noticeItem: FavoriteResponse) => (
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
                <LearneMore notice={noticeItem} isBurgerMenu={false} petId={noticeItem._id}/>
              </div>
            </li>
          ))}
  </ul>
)}

   </>
  )
};

export default MyFavorite;
