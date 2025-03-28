import style from '../../scss/components/_userBlock.module.scss';
import icons from '../../shared/icons/sprite.svg';

function UserBlock() {
  return (
    <div className={style.containerAvatarInfo}>
       <div className={style.avatar}>
            <svg width={40} height={40} className={style.iconUser}>
                <use xlinkHref={`${icons}#icon-user`} />
            </svg>
       </div>
    </div>
  )
};

export default UserBlock;
