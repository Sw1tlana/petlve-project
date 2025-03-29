import '../../../src/scss/components/btn/types/_primary.scss';
import style from '../../scss/components/_userNav.module.scss';

function UserNav() {
  return (
    <div>
      <button className={`btn btn--primary ${style.btnLogOut}`} type="button">Log out</button>
    </div>
  )
};

export default UserNav;


