import { useDispatch, useSelector } from 'react-redux';
import style from '../../../scss/components/_modalApproveAction.module.scss';
import icons from '../../../shared/icons/sprite.svg';
import { AppDispatch } from '../../../reduce/store';

import { logoutUser } from '../../../reduce/auth/operations';
import { selectIsLoggedIn } from '../../../reduce/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../../context/useModalContext';

function ModalApproveAction() {

      const dispatch = useDispatch<AppDispatch>();
      const isLoggedIn = useSelector(selectIsLoggedIn);
      const navigation = useNavigate();
      const { closeModal } = useModalContext();

        const onLogout = () => {
            if(isLoggedIn) {
            dispatch(logoutUser());
        }
        };

        const handleclick = () => {
          navigation('/');
          closeModal();  
        };

  return (
    <section className={style.containerModal}>

        <div className={style.avatar}>
            <svg width={44} height={44} className={style.iconAvatar}>
                <use xlinkHref={`${icons}#icon-avatar`} />
            </svg>
        </div>

        <h2 className={style.titleModal}>Already leaving?</h2>
        
        <div className={style.containerBtn}>
           <button
            className={`btn btn--primary ${style.btnModalLogout}`} 
            onClick={onLogout}
                type="button">
                 Yes
            </button>
           <button
           onClick={handleclick}
            className={`btn btn--primary ${style.btnModalLogout}`}  
                type='button'>
                    Cancel
            </button>
        </div>
    </section>
  )
};

export default ModalApproveAction;
