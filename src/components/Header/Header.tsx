import Container from '../../shared/components/Container/Container';
import Logo from '../../shared/components/Logo.tsx/Logo';
import AppBar from '../AppBar/AppBar';
import Nav from '../Nav/Nav';
import style from '../../scss/layout/_header.module.scss';

function Header() {
  return (
    <header>
      <Container>
        <div className={style.headerWrapper}>
          <Logo/>
          <nav>
              <Nav/>
          </nav>
          <AppBar/>
        </div>
      </Container>
    </header>
  )
};

export default Header;
