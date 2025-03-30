import Container from '../../shared/components/Container/Container';
import Logo from '../../shared/components/Logo.tsx/Logo';
import AppBar from '../AppBar/AppBar';
import Nav from '../Nav/Nav';
import style from '../../scss/layout/_header.module.scss';
import icons from '../../shared/icons/sprite.svg';

// conts getInitial = (name) {
//   return name ? name : '';
// }

function Header() {
  return (
    <header>
      <Container>
        <div className={style.headerWrapper}>
          <Logo/>
          <nav>
              <Nav/>
          </nav>
          <div className={style.authContainer}>
            <AppBar/>
            <div className={style.authInitial}>
            <svg width={20} height={20} className={style.iconUser}>
              <use xlinkHref={`${icons}#icon-user`} />
            </svg> 
            </div>
        {/* {user && getInitial(user.name)} */}
        </div>
      </div>
      </Container>
    </header>
  )
};

export default Header;
