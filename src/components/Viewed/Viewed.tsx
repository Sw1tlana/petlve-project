import style from '../../scss/components/_viewed.module.scss';

import { Pet } from "../../reduce/notices/slice";
// import LearnMore from '../LearnMore/LearnMore';

interface ViewedProps {
    viewedItems: Pet[];
    onViewed: (pet: Pet) => void;
  };

const Viewed: React.FC<ViewedProps> = ({ viewedItems }) => {
  return (
    <>
{viewedItems.length === 0 ? (
  <p>No items viewed yet.</p>
) : (
  <ul className={style.viewedList}>
    {viewedItems.map((noticeItem: Pet) => (
      <li key={noticeItem._id} className={style.viewedItem}>
            <img
            src={noticeItem.imgURL}
            alt={noticeItem.title}
            className={style.viewedImage}
            width={300}
          />
          <div className={style.containerTitle}>
            <p className={style.viewedTitle}>{noticeItem.title}</p>
          </div>
      </li>
    ))}
  </ul>
)}
    </>
  )
};

export default Viewed;
