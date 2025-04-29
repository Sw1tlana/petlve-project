import style from '../../scss/components/_editUserBtn.module.scss';
import icons from '../../shared/icons/sprite.svg';
import { useModalContext } from '../../context/useModalContext';
import ModalEditInformation from '../Modals/ModalEditInformation/ModalEditInformation';

function EditUserBtn() {

  const { openModal } = useModalContext();

  const handleClick = () => {
    openModal(<ModalEditInformation/>, false)
  };

  return (
    <div>
      <button
      onClick={handleClick} 
      className={style.editUserBtn}>
            <svg width={12} height={12} className={style.iconUser}>
                <use xlinkHref={`${icons}#icon-edit`} />
            </svg>
      </button>
    </div>
  )
};

export default EditUserBtn;
