import style from '../../scss/components/_myFavorite.module.scss';

function MyFavorite() {
  return (
    <div className={style.containerFavoriteProfile}>
        <button className={`btn btn--primary ${style.btnFavorite}`} type="button">My favorite pets</button>
        <button className={`btn btn--primary ${style.btnViewed}`} type="button">Viewed</button>
    </div>
  )
};

export default MyFavorite;
