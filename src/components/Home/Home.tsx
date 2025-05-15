import Container from "../../shared/components/Container/Container";
import style from "../../scss/components/_home.module.scss";
import { motion } from "framer-motion";

function Home() {
  return (
        <section className={style.homeSection}>
        <Container>
          <div className={style.homeContainerInfo}>
          <motion.h1
            className={style.homeTitle}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Take good{" "}
            <motion.span
              className={style.mini}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              care
            </motion.span>{" "}
            of your small pets
          </motion.h1>
                <motion.p
                  className={style.homeDescription}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Choosing a pet for your home is a choice
                  that is meant to enrich your life with 
                  immeasurable joy and tenderness.
                </motion.p>
        </div>
              <div className={style.imgHome}></div>
  </Container>        
      </section>
  )
};

export default Home;
