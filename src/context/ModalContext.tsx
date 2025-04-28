import { createContext, useState, useCallback, ReactNode } from 'react';
import ModalWindow from '../shared/components/ModalWindow/ModalWindow';

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode, burgerMenu?: boolean) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
  isBurgerMenu: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

  const openModal = useCallback((content: ReactNode, burgerMenu: boolean = true) => {
    setModalContent(content);
    setIsBurgerMenu(burgerMenu)
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
    setIsBurgerMenu(false);
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ 
      isOpen, 
      openModal, 
      closeModal, 
      modalContent, 
      isBurgerMenu }}>

      {children}

      <ModalWindow 
      isOpen={isOpen} 
      onRequestClose={closeModal} 
      isBurgerMenu={isBurgerMenu}>

        {modalContent}
      </ModalWindow>
    </ModalContext.Provider>
  );
};

export default ModalContext;
