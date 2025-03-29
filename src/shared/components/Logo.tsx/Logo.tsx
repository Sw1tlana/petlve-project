import { NavLink } from "react-router-dom";
import icons from '../../icons/sprite.svg';
import style from '../../../scss/components/_logo.module.scss';

function Logo() {
  return (
    <div>
        <NavLink className={style.linkLogo} to="/">
        petl 
        <svg width={22} height={22} className={style.iconHeart}>
           <use xlinkHref={`${icons}#icon-heart`} />
        </svg>
        ve
        </NavLink>
    </div>
  )
};

export default Logo;
