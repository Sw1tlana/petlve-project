import style from '../../scss/components/_error.module.scss';
import Container from '../../shared/components/Container/Container';
import errorCat from '../../shared/images/Error/cat@2x.png';
import four from '../../shared/images/Error/four@2x.png';

function Error() {
  return (
    <section>
        <Container>
            <div className={style.containerError}>
               <div className={style.containerContent}>
                <div className={style.containerImg}>
                    <img src={four} alt={four} width={74} height={120}/>
                      <img src={errorCat} alt={errorCat} width={116} height={117}/>
                        <img src={four} alt={four} width={74} height={120}/>
                </div>
                <h3>Ooops! This page not found :(</h3>
               </div>
            </div>
        </Container>

    </section>
  )
};

export default Error;
