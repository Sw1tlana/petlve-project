import style from '../../../scss/components/_modalWindow.module.scss';
import icons from '../../../shared/icons/sprite.svg';

import { useEffect, ReactNode } from 'react';
import Modal from 'react-modal';

interface ModalWindowProps {
    isBurgerMenu: boolean;
    isOpen: boolean;
    onRequestClose: () => void;
    children: ReactNode;
    shouldCloseOnOverlayClick?: boolean;
}

Modal.setAppElement('#root');

const ModalWindow: React.FC<ModalWindowProps> = ({
  isOpen,
  onRequestClose,
  children,
  shouldCloseOnOverlayClick = true,
  isBurgerMenu,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
  <>
<Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
  style={{
    overlay: {
      backgroundColor: isBurgerMenu ? 'transparent' : 'rgba(47, 47, 47, 0.6)',
      zIndex: '15',
      overflow: 'auto',
      display: 'grid',
      placeItems: 'center',
    },
  }}
  className={`${style.modalContent} ${isOpen ? style.modalContentOpen : style.beforeClose}`}
>
  <button onClick={onRequestClose} className={style.closeButton}>
    <svg className={style.iconClose} width={26} height={26}>
      <use xlinkHref={`${icons}#icon-close`} />
    </svg>
  </button>
  {children}
</Modal>
</>
  );
};

export default ModalWindow;
