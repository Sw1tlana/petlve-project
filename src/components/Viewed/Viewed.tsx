import favoriteStyle from '../../scss/components/_myFavorite.module.scss';
import style from '../../scss/components/_viewed.module.scss';

import { Pet } from "../../reduce/notices/slice";
import LearnMore from '../LearnMore/LearnMore';
import icons from '../../shared/icons/sprite.svg';

interface ViewedProps {
    viewedItems: Pet[];
    onViewed: (pet: Pet) => void;
  };

const Viewed: React.FC<ViewedProps> = ({ viewedItems, onViewed  }) => {
  return (
    <>
{viewedItems.length === 0 ? (
      <p className={style.descriptionFavorite}>
        Oops,<span className={style.textSpan}> looks like there aren't any furries </span>on our adorable page yet. 
        Do not worry! View your pets on the "find your favorite pet" 
        page and add them to your favorites. <span className={style.notifySpan}>🐾</span>
      </p>
) : (
  <ul className={favoriteStyle.favoriteList}>
    {viewedItems.map((noticeItem: Pet) => (
      <li key={noticeItem._id} 
          className={favoriteStyle.favoriteItem} 
          onClick={() => onViewed(noticeItem)}>
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
                      isBurgerMenu={false} />
                </div>
      </li>
    ))}
  </ul>
)}
    </>
  )
};

export default Viewed;
