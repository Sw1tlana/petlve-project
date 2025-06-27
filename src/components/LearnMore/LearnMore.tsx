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
import { AppDispatch } from '../../reduce/store';
import { ReactNode } from 'react';
import { fetchAddFavorites, fetchRemoveFavorites } from '../../reduce/notices/operations';
import { selectFavorites } from '../../reduce/notices/selectors';
import { fetchUser } from '../../reduce/auth/operations';

interface IModalContextType {
  openModal: (context: ReactNode) => void;
  closeModal: () => void;
};

  interface ModalNoticesProps {
    isBurgerMenu: boolean;
    notice: Pet;
    onViewed?: (pet: Pet) => void;
  };

function LearnMore({ notice, isBurgerMenu, onViewed }: ModalNoticesProps) {
  console.log("LearnMore.tsx:29", notice);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { openModal, closeModal } = useModalContext() as IModalContextType;

  const dispatch = useDispatch<AppDispatch>();

  const favoritePets = useSelector(selectFavorites) || [];

  const petId = String(notice._id);
  console.log("petId", petId)

const isFavorite = favoritePets
  .filter(fav => fav != null)
  .some(fav => fav._id === notice._id);

const handleFavoriteClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
  event.preventDefault();
  
  if (!isLoggedIn) {
    openModal(
      <ModalWindow
        isOpen
        onRequestClose={closeModal}
        isBurgerMenu={isBurgerMenu}
      >
        <ModalAttention />
      </ModalWindow>
    );
    return;
  }

  if (!notice?._id) return;

  try {
    if (isFavorite) {
      await dispatch(fetchRemoveFavorites(petId)).unwrap();
    } else {
      await dispatch(fetchAddFavorites(petId)).unwrap();
    }
    await dispatch(fetchUser());
  } catch (error) {
    console.error('Error updating favorites:', error);
  }
};

const handleClick = () => {
  if (onViewed) {
    onViewed(notice); 
  }
      openModal(
        <ModalWindow
          isOpen={true}
          onRequestClose={closeModal}
          isBurgerMenu={isBurgerMenu}
        >
      {isLoggedIn ? (
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
