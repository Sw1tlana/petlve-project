import style from '../../scss/components/_viewed.module.scss';
import icons from '../../shared/icons/sprite.svg';

import { Pet } from "../../reduce/notices/slice";
import LearnMore from '../LearnMore/LearnMore';

interface ViewedProps {
    viewedItems: Pet[];
    onViewed: (pet: Pet) => void;
  };

const Viewed: React.FC<ViewedProps> = ({ viewedItems, onViewed }) => {
  return (
    <>
      <ul>
        {viewedItems.map((noticeItem, index: number) => (
          <li key={`${noticeItem._id}-${index}`}>
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
                        onViewed={() => onViewed(noticeItem)}/>
                </div>
          </li>
        ))}
      </ul>
    </>
  )
};

export default Viewed;
