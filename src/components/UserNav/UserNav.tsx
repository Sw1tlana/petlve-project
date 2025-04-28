import { useSelector } from 'react-redux';
import '../../../src/scss/components/btn/types/_primary.scss';
import style from '../../scss/components/_userNav.module.scss';
import { selectIsLoggedIn, selectUser } from '../../reduce/auth/selectors';
// import { logoutUser } from '../../reduce/auth/operations';
// import { AppDispatch } from '../../reduce/store';

import { useModalContext } from "../../context/useModalContext";
import ModalApproveAction from '../Modals/ModalApproveAction/ModalApproveAction';

interface ModalContextType {
    openModal: (content: React.ReactNode) => void;
    close: () => void;
};

function UserNav() {

  // const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

   const { openModal } = useModalContext() as unknown as ModalContextType;

  // const onLogout = () => {
  //   if(isLoggedIn) {
  //     dispatch(logoutUser());
  // }
  // };

  const handleClickModal = () => {
    openModal(<ModalApproveAction/>)
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


