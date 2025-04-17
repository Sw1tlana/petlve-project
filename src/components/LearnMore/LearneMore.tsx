import style from '../../scss/components/_learneMore.module.scss';
import icons from '../../shared/icons/sprite.svg';
import { useModalContext } from '../../context/useModalContext';
import ModalNotices from '../Modals/ModalNotices/ModalNotices';
import ModalWindow from '../../shared/components/ModalWindow/ModalWindow';
import ModalAttention from '../Modals/ModalAttention/ModalAttention';
import { useDispatch, 
         useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../reduce/auth/selectors';
import { addFavorite, 
         deleteFavorite 
 } from '../../reduce/notices/slice';
import { selectFavoritePet } from '../../reduce/notices/selectors';
import { AppDispatch } from '../../reduce/store';
import { FavoriteResponse } from '../../reduce/notices/slice';
import { ReactNode } from 'react';

interface IModalContextType {
  openModal: (context: ReactNode) => void;
  closeModal: () => void;
}

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

  interface ModalNoticesProps {
    isBurgerMenu: boolean;
    notice: NoticeType;
    petId: string; 
  };

function LearneMore({ notice, isBurgerMenu }: ModalNoticesProps) {

  const isLoggeding = useSelector(selectIsLoggedIn);

  const { openModal, closeModal } = useModalContext() as IModalContextType;

  const dispatch = useDispatch<AppDispatch>();
  const favoritePet = useSelector(selectFavoritePet) || [];

    const isFavorite = favoritePet.some((pet: FavoriteResponse) => pet._id === notice._id);

  const handleFavoriteClick = () => {
    if (!isLoggeding) {
      openModal(
        <ModalWindow
          isOpen={true}
          onRequestClose={closeModal}
          isBurgerMenu={isBurgerMenu}
        >
          <ModalAttention />
        </ModalWindow>
      );
      return;
    }  
    const petId = JSON.stringify(notice._id); 
    console.log("Pet ID: ", petId, typeof petId); 
      if (isFavorite) {
     
        dispatch(deleteFavorite(petId));
    } else {
      dispatch(addFavorite([notice]));
    }
  };

    const handleClick = () => {
      openModal(
        <ModalWindow
          isOpen={true}
          onRequestClose={closeModal}
          isBurgerMenu={isBurgerMenu}
        >
      {isLoggeding ? (
        <ModalNotices notice={notice} isBurgerMenu={isBurgerMenu} />
      ) : (
        <ModalAttention />
      )}
    </ModalWindow>
      );
    };

  return (
    <div className={style.containerButton}>
        <button
        onClick={handleClick} 
           className={`btn btn--primary ${style.learnBtn}`} 
           type='button'>
               Learn more
            </button>
            <button
                onClick={handleFavoriteClick}
                type='button'
                aria-label={isFavorite ? 'Delete from favorites' : 'Add to favorites'}
                className={style.buttonHeart}
              >
                <svg width={14} height={14} className={style.iconHeart}>
                  <use xlinkHref={`${icons}#${isFavorite ? 'icon-trash' : 'icon-heart'}`} />
                </svg>
            </button>
    </div>
  )
};

export default LearneMore;
