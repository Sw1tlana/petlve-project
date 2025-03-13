import { NavLink } from "react-router-dom";
import icons from '../../icons/sprite.svg';

function Logo() {
  return (
    <div>
        <NavLink to="/">
        petl 
        <svg width={22} height={22} >
           <use xlinkHref={`${icons}#icon-heart`} />
        </svg>
        ve
        </NavLink>
    </div>
  )
};

export default Logo;
