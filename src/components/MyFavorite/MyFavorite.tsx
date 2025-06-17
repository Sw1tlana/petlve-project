import favoriteStyle from '../../scss/components/_myFavorite.module.scss';
import { selectFavoritePets, selectViewedItems } from '../../reduce/notices/selectors';
import { useDispatch, useSelector } from 'react-redux';
import LearnMore from '../LearnMore/LearnMore';
import icons from '../../shared/icons/sprite.svg';
import { useState } from 'react';
import Viewed from '../Viewed/Viewed';
import { removeViewedItem, Pet } from '../../reduce/notices/slice';

function MyFavorite() {
  const favoritePets = useSelector(selectFavoritePets);
  const viewedItems = useSelector(selectViewedItems);

  const dispatch = useDispatch();

  const [showViewed, setShowViewed] = useState(false);

    const toggleViewed = () => {
      setShowViewed(!showViewed);
    };

    const handleViewedItemClick = (pet: Pet) => {
      dispatch(removeViewedItem(pet._id));
    };

  return (
<section className={favoriteStyle.sectionFavorite}>
  <div className={favoriteStyle.containerFavoriteProfile}>
    <button 
        className={`btn btn--primary ${favoriteStyle.btnFavorite}`} 
        type="button" 
        onClick={() => setShowViewed(false)}>
      My favorite pets
    </button>
    <button 
        className={`btn btn--primary ${favoriteStyle.btnViewed}`} 
        type="button" 
        onClick={toggleViewed}>
      Viewed
    </button>
  </div>

  {showViewed ? (  
    <Viewed viewedItems={viewedItems} onViewed={handleViewedItemClick}/>
  ) : (
    Array.isArray(favoritePets) && favoritePets.length > 0 ? (
      <ul className={favoriteStyle.favoriteList}>
        {favoritePets
        .filter((noticeItem): noticeItem is Pet => !!noticeItem && !!noticeItem._id && !!noticeItem.imgURL)
        .map((noticeItem: Pet, index: number) => (
          <li className={favoriteStyle.favoriteItem} key={`${noticeItem._id}-${index}`}>
            <img
              src={noticeItem.imgURL}
              alt={noticeItem.title}
              className={favoriteStyle.noticesImage}
              width={300}
            />
            <div className={favoriteStyle.containerTitle}>
              <p className={favoriteStyle.noticesTitle}>{noticeItem.title}</p>
              <p className={favoriteStyle.noticesPopular}>{noticeItem.popularity}</p>
              <svg width={16} height={16} className={favoriteStyle.iconStar}>
                <use xlinkHref={`${icons}#icon-star`} />
              </svg>
            </div>
            <div className={favoriteStyle.containerInfo}>
              <p className={favoriteStyle.description}>
                <span className={favoriteStyle.spanDescription}>Name: </span>{noticeItem.name}
              </p>
              <p className={favoriteStyle.description}>
                <span className={favoriteStyle.spanDescription}>Birthday</span>
                {noticeItem.birthday}
              </p>
              <p className={favoriteStyle.description}>
                <span className={favoriteStyle.spanDescription}>Sex</span>
                {noticeItem.sex}
              </p>
              <p className={favoriteStyle.description}>
                <span className={favoriteStyle.spanDescription}>Species</span>
                {noticeItem.species}
              </p>
              <p className={favoriteStyle.description}>
                <span className={favoriteStyle.spanDescription}>Category</span>
                {noticeItem.category}
              </p>
            </div>
            <p className={favoriteStyle.comment}>{noticeItem.comment}</p>
            <p className={favoriteStyle.price}>${noticeItem.price}</p>

            <div>
              <LearnMore 
                  key={String(noticeItem._id)} 
                  notice={noticeItem} 
                  isBurgerMenu={false}
                  onViewed={() => {}} 
              />
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p 
        className={favoriteStyle.descriptionFavorite}>Oops,<span className={favoriteStyle.textSpan}> 
        looks like there aren't any furries </span>on our adorable page yet. 
        Do not worry! View your pets on the "find your favorite pet" 
        page and add them to your favorites.<span className={favoriteStyle.notifySpan}>🐾</span>
      </p>
    )
  )}
</section>
  )};
  
export default MyFavorite;
