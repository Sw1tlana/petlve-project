import { useDispatch, useSelector } from 'react-redux';
import style from '../../../scss/components/_modalApproveAction.module.scss';
import icons from '../../../shared/icons/sprite.svg';
import { AppDispatch } from '../../../reduce/store';

import { logoutUser } from '../../../reduce/auth/operations';
import { selectIsLoggedIn, selectUser } from '../../../reduce/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../../context/useModalContext';

function ModalApproveAction() {

  const user = useSelector(selectUser); 

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

    const avatarUrl = user?.avatar
    ? user.avatar.startsWith('http')
      ? `${user.avatar}?t=${Date.now()}`
      : `https://petlve-api.onrender.com${user.avatar}?t=${Date.now()}`
    : null;

  return (
    <section className={style.containerModal}>

          {avatarUrl ? (
              <img className={style.imgAvatar} src={avatarUrl} alt="User avatar" />
          ) : (
            <div className={style.avatar}>
              <svg width={40} height={40} className={style.iconUser}>
                <use xlinkHref={`${icons}#icon-user`} />
              </svg>
            </div>
          )}

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
