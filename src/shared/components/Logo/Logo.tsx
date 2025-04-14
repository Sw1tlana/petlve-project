import { NavLink, useLocation } from "react-router-dom";
import icons from '../../icons/sprite.svg';
import style from '../../../scss/components/_logo.module.scss';

function Logo() {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const classLogoHome = isHome ? style.logoHohe : "";
  const classIconLogo = isHome ? style.iconLogoHome : "";

  return (
    <div>
        <NavLink className={`${style.linkLogo} ${classLogoHome}`} to="/">
        petl 
        <svg width={22} height={22} className={`${style.iconHeart} ${classIconLogo}`}>
           <use xlinkHref={`${icons}#icon-heart`} />
        </svg>
        ve
        </NavLink>
    </div>
  )
};

export default Logo;
