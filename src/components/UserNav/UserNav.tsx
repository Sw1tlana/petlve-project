import { useSelector } from 'react-redux';
import '../../../src/scss/components/btn/types/_primary.scss';
import style from '../../scss/components/_userNav.module.scss';
import { selectIsLoggedIn, selectUser } from '../../reduce/auth/selectors';

import { useModalContext } from "../../context/useModalContext";
import ModalApproveAction from '../Modals/ModalApproveAction/ModalApproveAction';

function UserNav() {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

   const { openModal } = useModalContext();

  const handleClickModal = () => {
    openModal(
    <ModalApproveAction/>, false)
  };

  return (
    <div>
      {isLoggedIn && user && (
      <button 
          onClick={handleClickModal} 
          className={`btn btn--primary ${style.btnLogOut}`} 
          type="button">
        Log out
      </button>
)}
    </div>
  )
};

export default UserNav;


