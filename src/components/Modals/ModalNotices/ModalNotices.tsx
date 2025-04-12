import style from '../../../scss/components/_modalNotices.module.scss';
import icons from '../../../shared/icons/sprite.svg';
import Contact from '../../Contact/Contact';

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

function ModalNotices({ notice }: NoticeCardProps) {
  
  return (
    <div className={style.containerNotices}>
      <img
        src={notice.imgURL}
        alt={notice.title}
        className={style.noticesImage}
        width={300}
      />
        <p className={style.noticesTitle}>{notice.title}</p>
        <div className={style.containerPopularity}>
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
        <div className={style.containerBtn}>
          <button className={`btn btn--primary ${style.btnCard}`} type='button'>Add to</button>
          <Contact/>
        </div>
    </div>
  )
};

export default ModalNotices;
