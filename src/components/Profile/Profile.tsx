import style from '../../scss/components/_profile.module.scss';
import Container from '../../shared/components/Container/Container';
import icons from '../../shared/icons/sprite.svg';
import EditUserBtn from '../EditUserBtn/EditUserBtn';
import UserBlock from '../UserBlock/UserBlock';

function Profile() {
  return (
    <section>
        <Container>
            <div className={style.profileContainer}>
              <div className={style.containerBtnUser}>
                <div className={style.user}>
                <svg width={20} height={20} className={style.iconUser}>
                    <use xlinkHref={`${icons}#icon-user`} />
                </svg>
                <span className={style.spanUser}>User</span>
            </div>
            <EditUserBtn/>
            </div>

            <div className={style.containerUserBlock}>
                <UserBlock/>
            </div>
            </div>
        </Container>

    </section>
  )
};

export default Profile;
