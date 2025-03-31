import { useContext } from 'react';
import ModalContext from './ModalContext.js';

export const useModalContext = () => useContext(ModalContext);
