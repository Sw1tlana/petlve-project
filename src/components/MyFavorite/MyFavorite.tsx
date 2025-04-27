import favoriteStyle from '../../scss/components/_myFavorite.module.scss';
import { selectFavoritePets, selectViewedItems } from '../../reduce/notices/selectors';
import { useSelector } from 'react-redux';
import LearnMore from '../LearnMore/LearnMore';
import { Pet } from '../../reduce/notices/slice';
import icons from '../../shared/icons/sprite.svg';

function MyFavorite() {
  const favoritePets = useSelector(selectFavoritePets);
  const viewedItems = useSelector(selectViewedItems);
  console.log('Viewed items from Redux:', viewedItems);

  return (
    <section className={favoriteStyle.sectionFavorite}>
      <div className={favoriteStyle.containerFavoriteProfile}>
        <button className={`btn btn--primary ${favoriteStyle.btnFavorite}`} type="button">
          My favorite pets
        </button>
        <button className={`btn btn--primary ${favoriteStyle.btnViewed}`} type="button">
          Viewed
        </button>
      </div>
        {Array.isArray(favoritePets) && favoritePets.length > 0 && (
          <ul className={favoriteStyle.noticesList}>
            {favoritePets.map((noticeItem: Pet, index: number) => (
              <li
                className={favoriteStyle.noticesItem}
                key={`${noticeItem._id}-${index}`}
              >
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
                 
                </div>
                <p className={favoriteStyle.comment}>{noticeItem.comment}</p>
                <p className={favoriteStyle.price}>${noticeItem.price}</p>

                <div>
                  <LearnMore key={String(noticeItem._id)} notice={noticeItem} isBurgerMenu={false}/>
                </div>
              </li>
            ))}
          </ul>
        )}
    </section>
  )};
  
export default MyFavorite;
