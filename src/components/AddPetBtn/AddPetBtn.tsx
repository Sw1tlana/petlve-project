
import style from '../../scss/components/_addPetBtn.module.scss';
import icons from '../../shared/icons/sprite.svg';

function AddPetBtn() {

  return (
    <div>
      <button 
        type="button" 
        className={style.addPetBtn}>
        Add pet
        <svg width={20} height={20} className={style.iconPlus}>
           <use xlinkHref={`${icons}#icon-plus`} />
        </svg>
      </button>
    </div>
  )
};

export default AddPetBtn;
