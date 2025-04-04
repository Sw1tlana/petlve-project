import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import style from '../../scss/components/_appBar.module.scss';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../reduce/auth/selectors";

interface AppBarProps {
  isBurgerMenu: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ isBurgerMenu }) => {

  const isLoggedin = useSelector(selectIsLoggedIn);

  return (
    <div className={isBurgerMenu ? style.burgerAppBar : style.appBar}>
      { isLoggedin ? <AuthNav/> : <UserNav/> }
    </div>
  )
};

export default AppBar;
