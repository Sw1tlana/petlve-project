import { NavLink, useLocation } from "react-router-dom";
import style from '../../scss/components/_nav.module.scss';
import clsx from "clsx";

function Nav() {

  const location = useLocation();
  const isHome = location.pathname === "/";

  const headerNav = ({ isActive }: { isActive: boolean }, isHome: boolean) =>
    clsx(style.headerLink, isActive && style.headerActive, isHome && style.whiteText);

  return (
    <div className={style.containerNav}>
      <NavLink className={(props) => headerNav(props, isHome)} to="/news">News</NavLink>
      <NavLink className={(props) => headerNav(props, isHome)} to="/notices">Find pet</NavLink>
      <NavLink className={(props) => headerNav(props, isHome)} to="/friends">Our friends</NavLink>
    </div>
  )
};

export default Nav;


