import style from '../../scss/components/_learneMore.module.scss';
import icons from '../../shared/icons/sprite.svg';
import { useModalContext } from '../../context/useModalContext';
import ModalNotices from '../Modals/ModalNotices/ModalNotices';
import ModalWindow from '../../shared/components/ModalWindow/ModalWindow';
import ModalAttention from '../Modals/ModalAttention/ModalAttention';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../reduce/auth/selectors';

interface ModalContextType {
    openModal: (context: React.ReactNode) => void;
    closeModal: () => void;
};

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
  };

function LearneMore({ notice, isBurgerMenu }: ModalNoticesProps) {
  const isLoggeding = useSelector(selectIsLoggedIn);

    const { openModal, closeModal } = useModalContext() as unknown as ModalContextType;


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
                 type='button'
                 aria-label='Add to favorites'
                 className={style.buttonHeart}>
                <svg 
                    width={14} 
                    height={14} 
                    className={style.iconHeart}>
                    <use xlinkHref={`${icons}#icon-heart`} />
                </svg>
            </button>
    </div>
  )
};

export default LearneMore;
