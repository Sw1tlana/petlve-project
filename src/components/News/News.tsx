import { useDispatch, useSelector } from 'react-redux';
import style from '../../scss/components/_news.module.scss';
import Container from '../../shared/components/Container/Container';
import SearchFild from '../SearchField/SearchFild';
import { selectIsLoggedInNews, selectItemsNews } from '../../reduce/news/selectors';
import { useEffect } from 'react';
import { AppDispatch } from '../../reduce/store';
import { fetchNews } from '../../reduce/news/operations';
import Loader from '../../shared/components/Loader.tsx/Loader';
import { Link } from 'react-router-dom';

function News() {
  const dispatch = useDispatch<AppDispatch>();
  const lisLoadingNews = useSelector(selectIsLoggedInNews);
  const news = useSelector(selectItemsNews);

  useEffect(() => {
    dispatch(fetchNews());
  },[dispatch]);


  return (
    <section>
        <Container>
            <h2 className={style.titleNews}>News</h2>
            <SearchFild/>
            {lisLoadingNews && <Loader/>}
            {!lisLoadingNews && news.length === 0 && <Loader />}
            {news.length > 0 && (
              <ul>
                {news.map((newsItem, index: number) => (
                  <li key={`${newsItem._id}-${index}`}>
                  <img
                      src={newsItem.imgUrl}
                      alt={newsItem.title}
                      className={style.friendImage}
                />
                <h3>{newsItem.title}</h3>
                <p>{newsItem.text}</p>
                <p>{newsItem.date}</p>
                <Link to={newsItem.url}>Read more</Link>
                  </li>
              ))}
             </ul>
)}

      </Container>
    </section>
  )
};

export default News;
