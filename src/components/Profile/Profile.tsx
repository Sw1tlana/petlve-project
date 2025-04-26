import style from '../../scss/components/_profile.module.scss';
import Container from '../../shared/components/Container/Container';
import icons from '../../shared/icons/sprite.svg';
import EditUserBtn from '../EditUserBtn/EditUserBtn';
import MyFavorite from '../MyFavorite/MyFavorite';
import PetsBlock from '../PetsBlock/PetsBlock';
import UserBlock from '../UserBlock/UserBlock';
import UserNav from '../UserNav/UserNav';

function Profile() {
  
  return (
        <Container>
          <section className={style.sectionProfile}>
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
            <div className={style.containerPetBlock}>
              <PetsBlock/>
            </div>
          <UserNav/> 
          </div>
          <MyFavorite/>
          </section>
        </Container>
  )
};

export default Profile;
