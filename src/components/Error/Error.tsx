import { NavLink } from 'react-router-dom';
import style from '../../scss/components/_error.module.scss';
import Container from '../../shared/components/Container/Container';
import errorCat from '../../shared/images/Error/cat@2x.png';
import four from '../../shared/images/Error/four@2x.png';
import clsx from 'clsx';

const getHomeLinkClass = ({ isActive} : { isActive: boolean }) => {
  return clsx(style.homeLink, {
    [style.activeHome]: isActive,
  })
};

function Error() {
  return (
    <section>
        <Container>
            <div className={style.containerError}>
               <div className={style.containerContent}>
                <div className={style.containerImg}>
                    <img className={style.imgFour} src={four} alt={four} width={74} height={120}/>
                      <img className={style.imgCat} src={errorCat} alt={errorCat} width={116} height={117}/>
                        <img className={style.imgFour} src={four} alt={four} width={74} height={120}/>
                </div>
                <h3 className={style.errorTitle}>Ooops! This page not found :</h3>
                <NavLink className={getHomeLinkClass} to={'/'}>To home page</NavLink>
               </div>
            </div>
        </Container>

    </section>
  )
};

export default Error;
