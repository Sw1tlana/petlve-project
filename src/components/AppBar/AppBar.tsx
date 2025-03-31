// import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import style from '../../scss/components/_appBar.module.scss';

interface AppBarProps {
  isBurgerMenu: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ isBurgerMenu }) => {
  return (
    <div className={isBurgerMenu ? style.burgerAppBar : style.appBar}>
       {/* <AuthNav/> */}
       <UserNav/>
    </div>
  )
};

export default AppBar;
