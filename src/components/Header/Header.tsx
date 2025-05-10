import Container from '../../shared/components/Container/Container';
import Logo from '../../shared/components/Logo/Logo';
import AppBar from '../AppBar/AppBar';
import Nav from '../Nav/Nav';
import { useModalContext } from '../../context/useModalContext';
import style from '../../scss/layout/_header.module.scss';
import icons from '../../shared/icons/sprite.svg';
import ModalBurgerMenu from '../Modals/ModalBurgerMenu';

import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../reduce/auth/selectors';

interface ModalContextType {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}
function Header() {
  const location = useLocation();
  const isHome = location.pathname ===  '/';

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const { openModal } = useModalContext() as unknown as ModalContextType;

const headerClass = isHome ? `${style.headerWidth} ${style.headerHome}` : `${style.headerOther}`;
const burgerClass = isHome ? style.burgerHome : "";

  const handleClick = () => {
    openModal(<ModalBurgerMenu isBurgerMenu={true}/>);
  };

  const handleClickProfile = () => {
       navigate('/current');
  };

  const avatarUrl = user?.avatar ? user.avatar.startsWith('http')
  ? `${user.avatar}?t=${Date.now()}`
    : `https://petlve-api.onrender.com${user.avatar}?t=${Date.now()}`
    : null;
  
const getInitial = (name: string | undefined | null): string => {
  return name ?? '';
};

  return (
      <Container>
        <header className={`${style.headerWrapper} ${headerClass}`}>
          <Logo/>
          <nav className={style.navContainer}>
              <Nav/>
          </nav>
          <div className={style.authContainer}>
            <div className={style.appBar}>
              <AppBar isBurgerMenu={false} />
            </div>

            <div className={style.containerInitial}>
            <button
              onClick={handleClickProfile} 
              type='button'
              className={style.btnInitial} 
              >
               {avatarUrl ? (
              <img 
                  className={style.imgAvatar} 
                  src={avatarUrl} 
                  alt="User avatar"
                  width={50} 
              />
          ) : (
            <div className={style.authInitial}>
              <svg width={40} height={40} className={style.iconUser}>
                <use xlinkHref={`${icons}#icon-user`} />
              </svg>
            </div>
          )}
            </button>
        {user && <span>{getInitial(user.name)}</span>}
        </div>

        </div>
            <button className={style.burgerMenu} onClick={handleClick}>
              <svg width={32} height={32} className={`${style.iconBurger} ${burgerClass}`}>
                <use xlinkHref={`${icons}#icon-menu-burger`} />
              </svg>
            </button>
      </header>
      </Container>
  )
};

export default Header;
