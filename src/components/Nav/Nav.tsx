import { NavLink } from "react-router-dom";
import style from '../../scss/components/_nav.module.scss';
import clsx from "clsx";

const headerNav = ({ isActive }: { isActive: boolean }) =>
  clsx(style.headerLink, isActive && style.headerActive);

function Nav() {
  return (
    <div className={style.containerNav}>
      <NavLink className={headerNav} to="/news">News</NavLink>
      <NavLink className={headerNav} to="/notices">Find pet</NavLink>
      <NavLink className={headerNav} to="/friends">Our friends</NavLink>
    </div>
  )
};

export default Nav;


