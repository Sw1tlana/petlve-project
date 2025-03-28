import style from '../../scss/components/_editUserBtn.module.scss';
import icons from '../../shared/icons/sprite.svg';

function EditUserBtn() {
  return (
    <div>
      <button className={style.editUserBtn}>
            <svg width={12} height={12} className={style.iconUser}>
                <use xlinkHref={`${icons}#icon-edit`} />
            </svg>
      </button>
    </div>
  )
};

export default EditUserBtn;
