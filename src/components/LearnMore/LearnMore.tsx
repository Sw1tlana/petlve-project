import style from '../../scss/components/_learneMore.module.scss';
import icons from '../../shared/icons/sprite.svg';
import { useModalContext } from '../../context/useModalContext';
import ModalNotices from '../Modals/ModalNotices/ModalNotices';
import ModalWindow from '../../shared/components/ModalWindow/ModalWindow';
import ModalAttention from '../Modals/ModalAttention/ModalAttention';
import { useDispatch, 
         useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../reduce/auth/selectors';
import { Pet } from '../../reduce/notices/slice';
import { selectFavoritePets } from '../../reduce/notices/selectors';
import { AppDispatch } from '../../reduce/store';
import { ReactNode } from 'react';
import { addFavorite } from '../../reduce/notices/operations';

interface IModalContextType {
  openModal: (context: ReactNode) => void;
  closeModal: () => void;
};

  interface ModalNoticesProps {
    isBurgerMenu: boolean;
    notice: Pet;
  };

function LearnMore({ notice, isBurgerMenu }: ModalNoticesProps) {

  const isLoggeding = useSelector(selectIsLoggedIn);

  const { openModal, closeModal } = useModalContext() as IModalContextType;

  const dispatch = useDispatch<AppDispatch>();

  const favoritePets = useSelector(selectFavoritePets) || [];

  const petId = String(notice._id); 
  const isFavorite = favoritePets.some((pet: Pet) => String(pet._id) === petId);
  
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

    const cleanedNotice = {
      ...notice,
      _id: petId,
    };
  
    if (isFavorite) {
      // Тут має бути removeFavorite, додамо його пізніше
      console.log("Pet is already in favorites — remove logic needed");
    } else {
      dispatch(addFavorite({ id: notice._id, favorites: [cleanedNotice] }));
      console.log("Added to favorites:", JSON.stringify(cleanedNotice));
    };
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

export default LearnMore;
