import style from '../../../scss/components/_modalNotices.module.scss';
import LearneMore from '../../LearnMore/LearneMore';
import icons from '../../../shared/icons/sprite.svg';

interface NoticeType {
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

interface NoticeCardProps {
    notice: NoticeType;
    isBurgerMenu: boolean;
  };

function ModalNotices({ notice, isBurgerMenu }: NoticeCardProps) {
  return (
    <div>
      <img
        src={notice.imgURL}
        alt={notice.title}
        className={style.noticesImage}
        width={300}
      />
      <div className={style.containerTitle}>
        <p className={style.noticesTitle}>{notice.title}</p>
        <p className={style.noticesPopular}>{notice.popularity}</p>
        <svg width={16} height={16} className={style.iconStar}>
          <use xlinkHref={`${icons}#icon-star`} />
        </svg>
      </div>
      <div className={style.containerInfo}>
        <p className={style.description}>
          <span className={style.spanDescription}>Name</span>
          {notice.name}
        </p>
        <p className={style.description}>
          <span className={style.spanDescription}>Birthday</span>
          {notice.birthday}
        </p>
        <p className={style.description}>
          <span className={style.spanDescription}>Sex</span>
          {notice.sex}
        </p>
        <p className={style.description}>
          <span className={style.spanDescription}>Species</span>
          {notice.species}
        </p>
        <p className={style.description}>
          <span className={style.spanDescription}>Category</span>
          {notice.category}
        </p>
      </div>
      <p className={style.comment}>{notice.comment}</p>
      <p className={style.price}>${notice.price}</p>

      <div>
        <LearneMore notice={notice} isBurgerMenu={isBurgerMenu}/>
      </div>
    </div>
  )
};

export default ModalNotices;
