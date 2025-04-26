import style from '../../scss/components/_myFavorite.module.scss';
import { selectFavoritePets } from '../../reduce/notices/selectors';
import { useSelector } from 'react-redux';
import LearnMore from '../LearnMore/LearnMore';
import { Pet } from '../../reduce/notices/slice';
import icons from '../../shared/icons/sprite.svg';
import { useState } from 'react';
import Viewed from '../Viewed/Viewed';

function MyFavorite() {
  const favoritePets = useSelector(selectFavoritePets);

  const [viewedItems, setViewedItems] = useState<Pet[]>([]);
  const [showViewed, setShowViewed] = useState<boolean>(false);

  const handleMarkAsViewed = (pet: Pet) => {
    if (!viewedItems.some(item => item._id === pet._id)) {
      setViewedItems(prev => [...prev, pet]);
    }
  };

  const toggleViewed = () => {
    setShowViewed(!showViewed);
  };

  const handleClick = () => {
     setShowViewed(false);
  };
  
  return (
    <section className={style.sectionFavorite}>
  <div className={style.containerFavoriteProfile}>
    <button
      onClick={handleClick}
      className={`btn btn--primary ${style.btnFavorite}`}
      type="button"
    >
      My favorite pets
    </button>
    <button
      onClick={toggleViewed}
      className={`btn btn--primary ${style.btnViewed}`}
      type="button"
    >
      Viewed
    </button>
  </div>

  {showViewed ? (
    <div className={style.viewedItems}>
      <h3>Viewed Items:</h3>
      {viewedItems.length === 0 ? (
        <p>No items viewed yet.</p>
      ) : (
        <Viewed viewedItems={viewedItems} onViewed={handleMarkAsViewed} />
      )}
    </div>
  ) : (
    Array.isArray(favoritePets) && favoritePets.length > 0 && (
      <ul className={style.noticesList}>
        {favoritePets.map((noticeItem: Pet, index: number) => (
          <li
            className={style.noticesItem}
            key={`${noticeItem._id}-${index}`}
            onClick={() => handleMarkAsViewed(noticeItem)}
          >
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
                <span className={style.spanDescription}>Name: </span>
                {noticeItem.name}
              </p>
              <p className={style.description}>
                <span className={style.spanDescription}>Birthday: </span>
                {noticeItem.birthday}
              </p>
              <p className={style.description}>
                <span className={style.spanDescription}>Sex: </span>
                {noticeItem.sex}
              </p>
              <p className={style.description}>
                <span className={style.spanDescription}>Species: </span>
                {noticeItem.species}
              </p>
              <p className={style.description}>
                <span className={style.spanDescription}>Category: </span>
                {noticeItem.category}
              </p>
            </div>
            <p className={style.comment}>{noticeItem.comment}</p>
            <p className={style.price}>${noticeItem.price}</p>

            <div>
              <LearnMore
                key={String(noticeItem._id)}
                notice={noticeItem}
                isBurgerMenu={false}
                onViewed={() => handleMarkAsViewed(noticeItem)}
              />
            </div>
          </li>
        ))}
      </ul>
    )
  )}
</section>
  )};
  
export default MyFavorite;
