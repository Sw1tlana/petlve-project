import { NavLink } from "react-router-dom";
import style from '../../scss/components/_addPetBtn.module.scss';
import '../../scss/components/btn/types/_primary.scss';

function AuthNav() {
  return (
    <div className={style.containerAuth}>
        <NavLink className='btn btn--primary' to="/signin">Log In</NavLink>
        <NavLink className='btn btn--primary' to="/signup">Registration</NavLink>
    </div>
  )
};

export default AuthNav;
