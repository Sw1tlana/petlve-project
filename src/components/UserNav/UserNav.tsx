import styles from '../../scss/components/btn/types/_primary.module.scss';

function UserNav() {
  return (
    <div>
        <button className={`btn ${styles["btn--primary"]}`} type="button">Log out</button>
    </div>
  )
};

export default UserNav;


