import { createContext, useState, useCallback, ReactNode } from 'react';
import ModalWindow from '../shared/components/ModalWindow/ModalWindow';

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
      {children}

      <ModalWindow isOpen={isOpen} onRequestClose={closeModal}>
        {modalContent}
      </ModalWindow>
    </ModalContext.Provider>
  );
};

export default ModalContext;
