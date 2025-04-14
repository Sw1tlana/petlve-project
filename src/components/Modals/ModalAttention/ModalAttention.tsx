import { useNavigate } from 'react-router-dom';
import style from '../../../scss/components/_modalAttention.module.scss';
import icons from '../../../shared/icons/sprite.svg';


function ModalAttention() {
    const navigate = useNavigate();

    const handleClickRegister = () => {
        navigate('/signup');
    };

    const handleClickLogin = () => {
        navigate('/signin');
    };

  return (
    <section className={style.containerAttention}>
        <div className={style.avatar}>
            <svg width={44} height={44} className={style.iconAvatar}>
                <use xlinkHref={`${icons}#icon-avatar`} />
            </svg>
        </div>
        <h2 className={style.titleAttention}>Attention</h2>
        <p className={style.description}>
            We would like to remind you that certain functionality is available only to authorized users.
            If you have an account, please log in with your credentials. If you do not already have an account, 
            you must register to access these features.
        </p>
        <div className={style.containerBtn}>
            <button
            onClick={handleClickLogin}
                type='button' 
                className={`btn btn--primary ${style.btnAttention}`}>
                Log In
            </button>
            <button 
                onClick={handleClickRegister} 
                type='button' 
                className={`btn btn--primary ${style.btnAttention}`}>
                Registration
            </button>
        </div>
    </section>
  )
};

export default ModalAttention;

