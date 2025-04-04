import { useDispatch, useSelector } from 'react-redux';
import '../../../src/scss/components/btn/types/_primary.scss';
import style from '../../scss/components/_userNav.module.scss';
import { selectIsLoggedIn, selectUser } from '../../reduce/auth/selectors';
import { logoutUser } from '../../reduce/auth/operations';
import { AppDispatch } from '../../reduce/store';


function UserNav() {

  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const onLogout = () => {
    if(isLoggedIn) {
      dispatch(logoutUser());
}
  };

  return (
    <div>
      {isLoggedIn && user && (
      <button 
          onClick={onLogout} 
          className={`btn btn--primary ${style.btnLogOut}`} 
          type="button">
        Log out
      </button>
)}
    </div>
  )
};

export default UserNav;


