import style from '../../scss/components/_news.module.scss';
import Container from '../../shared/components/Container/Container';
import SearchFild from '../SearchField/SearchFild';

function News() {
  return (
    <section>
        <Container>
            <h2 className={style.titleNews}>News</h2>
            <SearchFild/>
      </Container>
    </section>
  )
};

export default News;
