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
        <Container>
          <section className={style.containerNews}>
            <h2 className={style.titleNews}>News</h2>
            <SearchFild/>
            {lisLoadingNews && <Loader/>}
            {!lisLoadingNews && news.length === 0 && <Loader />}
            {news.length > 0 && (
              <ul className={style.newsList}>
                {news.map((newsItem, index: number) => (
                  <li className={style.newsItem} key={`${newsItem._id}-${index}`}>
                  <img
                      src={newsItem.imgUrl}
                      alt={newsItem.title}
                      className={style.newsImage}
                />
                <h3 className={style.titleNews}>{newsItem.title}</h3>
                <p className={style.textNews}>{newsItem.text}</p>
                <div className={style.containerDateLink}>
                  <p className={style.dateNews}>{newsItem.date}</p>
                  <Link 
                      className={style.linkNews} 
                      to={newsItem.url} 
                      target="_blank" 
                      rel="noopener noreferrer">
                    Read more
                  </Link>
                </div>
              </li>
              ))}
             </ul>
           )}
           </section>
      </Container>
  )
};

export default News;
