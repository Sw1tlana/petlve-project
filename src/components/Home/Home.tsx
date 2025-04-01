import Container from "../../shared/components/Container/Container";
import style from "../../scss/components/_home.module.scss";

function Home() {
  return (
        <section className={style.homeSection}>
        <Container>
          <div className={style.homeContainerInfo}>
              <h1 className={style.homeTitle}>
              Take good <span className={style.mini}>
              care</span> of your 
              small pets
              </h1>
              <p className={style.homeDescription}>Choosing a pet for your home is a choice
                 that is meant to enrich your life with 
                 immeasurable joy and tenderness.
              </p>
        </div>
          <div className={style.imgHome}>
        </div>
      </Container>        
      </section>
  )
};

export default Home;
