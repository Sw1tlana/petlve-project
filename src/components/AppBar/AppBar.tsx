import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import style from '../../scss/components/_appBar.module.scss';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../reduce/auth/selectors";

interface AppBarProps {
  isBurgerMenu: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ isBurgerMenu }) => {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={isBurgerMenu ? style.burgerAppBar : style.appBar}>
      {isLoggedIn ? <UserNav /> : <AuthNav />}
    </div>
  )
};

export default AppBar;
