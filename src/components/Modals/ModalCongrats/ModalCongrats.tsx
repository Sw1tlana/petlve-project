import { useNavigate } from 'react-router-dom';
import style from '../../../scss/components/_modalCongrats.module.scss';
import { useModalContext } from "../../../context/useModalContext";

interface ModalCongratsProps {
  photoUrl?: string;
};

function ModalCongrats({ photoUrl }: ModalCongratsProps) {
  const navigate = useNavigate();

 const { closeModal } = useModalContext();

  const handleClick = () => {
      navigate('/current');
      closeModal();
  };

  return (
    <div className={style.modalCongrats}>
      {photoUrl && (
      <img 
        src={photoUrl} 
        alt="avatar pet" 
        className={style.avatarCongrats} 
        width={80}
        height={80}
        />
      )}
      <h2 className={style.titleCongrats}>Congrats</h2>
      <p className={style.textCongrats}>
        The first fluff in the favorites! 
        May your friendship be the happiest and filled with fun.
      </p>
      <button 
        type='button'
        onClick={handleClick}
        className={`btn btn--primary ${style.btnAttention}`}>
         Go to profile
      </button>
    </div>
  )
};

export default ModalCongrats;

