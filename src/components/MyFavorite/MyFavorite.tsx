import style from '../../scss/components/_myFavorite.module.scss';
import { selectFavoritePet } from '../../reduce/notices/selectors';
import { useSelector } from 'react-redux';
import LearnMore from '../LearnMore/LearnMore';
import { Pet } from '../../reduce/notices/slice';
import icons from '../../shared/icons/sprite.svg';

function MyFavorite() {
  const favoritePets = useSelector(selectFavoritePet);

  return (
    <>
        <div className={style.containerFavoriteProfile}>
         <button className={`btn btn--primary ${style.btnFavorite}`} type="button">My favorite pets</button>
         <button className={`btn btn--primary ${style.btnViewed}`} type="button">Viewed</button>
     </div>
  {Array.isArray(favoritePets) && favoritePets.length > 0 && (
        <ul className={style.noticesList}>
          {favoritePets.map((noticeItem: Pet, index: number) => (
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
                <LearnMore 
                  key={String(noticeItem._id) as string} 
                  notice={noticeItem} 
                  isBurgerMenu={false} />
              </div>
            </li>
          ))}
  </ul>
)}

   </>
  )
};

export default MyFavorite;
