import style from '../../scss/components/_modalBurgerMenu.module.scss';
import AppBar from '../AppBar/AppBar';
import Nav from '../Nav/Nav';

interface ModalBurgerMenuProps {
    isBurgerMenu: boolean;
  }

function ModalBurgerMenu({ isBurgerMenu }: ModalBurgerMenuProps) {
  return (
    <div className={`${style.containerBurger} ${isBurgerMenu ? style.open : style.closed}`}>
       <Nav/>
       <AppBar isBurgerMenu={isBurgerMenu}/>
    </div>
  )
};

export default ModalBurgerMenu;
