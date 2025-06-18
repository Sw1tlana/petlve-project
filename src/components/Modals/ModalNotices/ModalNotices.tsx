import { useEffect, useState } from 'react';
import style from '../../../scss/components/_modalNotices.module.scss';
import Contact from '../../Contact/Contact';
import icons from '../../../shared/icons/sprite.svg';

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../reduce/store';
import { fetchAddFavorites } from '../../../reduce/auth/operations';

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
  const [value, setValue] = useState<number | null>(1);

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    setValue(notice.popularity);
  }, [notice.popularity]);

  const handleClick = () => {
    dispatch(fetchAddFavorites(notice._id));
  }

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
        <Stack spacing={1}>
            <Rating
              name="star-rating"
              value={value}
              precision={0.5} 
              readOnly 
              onChange={(_, newValue) => setValue(newValue)} 
            />
       </Stack>
       <p className={style.noticesPopular}>{notice.popularity}</p>
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
          <button 
              onClick = {handleClick}
              className={`btn btn--primary ${style.btnCard}`} 
              type='button'>
            Add to
            <svg width={18} height={18} className={style.iconHeart}>
              <use xlinkHref={`${icons}#icon-heart`} />
            </svg>
          </button>
          <Contact/>
        </div>
    </div>
  )
};

export default ModalNotices;
