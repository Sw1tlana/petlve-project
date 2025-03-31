import Container from '../../shared/components/Container/Container';
import Logo from '../../shared/components/Logo.tsx/Logo';
import AppBar from '../AppBar/AppBar';
import Nav from '../Nav/Nav';
import { useModalContext } from '../../context/useModalContext';
import style from '../../scss/layout/_header.module.scss';
import icons from '../../shared/icons/sprite.svg';
import ModalBurgerMenu from '../Modals/ModalBurgerMenu';

interface ModalContextType {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}
function Header() {

  const { openModal } = useModalContext() as unknown as ModalContextType;


  const handleClick = () => {
    openModal(<ModalBurgerMenu isBurgerMenu={true}/>);
  };
  
// conts getInitial = (name) {
//   return name ? name : '';
// }

  return (
    <header>
      <Container>
        <div className={style.headerWrapper}>
          <Logo/>
          <nav className={style.navContainer}>
              <Nav/>
          </nav>
          <div className={style.authContainer}>
            <div className={style.appBar}>
              <AppBar isBurgerMenu={false} />
            </div>
            <div className={style.authInitial}>
            <svg width={20} height={20} className={style.iconUser}>
              <use xlinkHref={`${icons}#icon-user`} />
            </svg> 
            </div>
        {/* {user && getInitial(user.name)} */}
        </div>
            <button className={`${style.burgerMenu} ${style.burgerMenuClass}`} onClick={handleClick}>
              <svg width={32} height={32} className={style.iconBurger}>
                <use xlinkHref={`${icons}#icon-menu-burger`} />
              </svg>
            </button>
      </div>
      </Container>
    </header>
  )
};

export default Header;
