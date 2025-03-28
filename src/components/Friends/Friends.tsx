import style from '../../scss/components/_friends.module.scss';
import Container from '../../shared/components/Container/Container';

export default function Friends() {
  return (
    <section>
        <Container>
           <h2 className={style.friendsTitle}>Our friends</h2>
        </Container>
    </section>
  )
}
